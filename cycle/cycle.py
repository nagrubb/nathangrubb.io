#!/usr/bin/env python3
import toml
from functools import wraps
from flask_cors import CORS
from flask import Flask, jsonify, request, current_app
from stravalib import unithelper
from stravalib.client import Client

ts = None
application = Flask(__name__)
CORS(application)

try:
    config = toml.load("cycle.toml")
    access_token = config["strava"]["access_token"]
    year_goal = int(config["goal"]["year"])
except:
    #TODO syslog this
    pass

application = Flask(__name__)
CORS(application)

def jsonp(func):
    """Wraps JSONified output for JSONP requests."""
    @wraps(func)
    def decorated_function(*args, **kwargs):
        callback = request.args.get('callback', False)
        if callback:
            data = str(func(*args, **kwargs).data)
            content = str(callback) + '(' + data + ')'
            mimetype = 'application/javascript'
            return current_app.response_class(content, mimetype=mimetype)
        else:
            return func(*args, **kwargs)
    return decorated_function

@application.route("/cycle")
@jsonp
def cycle():
    client = Client()
    client.access_token = access_token
    stats = client.get_athlete_stats()
    ride_total=float(unithelper.miles(stats.ytd_ride_totals.distance));

    return jsonify(
        ytd=ride_total,
        goal=year_goal
    );

if __name__ == "__main__":
    application.run(host='0.0.0.0')
