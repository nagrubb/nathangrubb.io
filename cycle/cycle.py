#!/usr/bin/env python3
import toml
from flask import Flask, jsonify
from stravalib import unithelper
from stravalib.client import Client

ts = None
application = Flask(__name__)

try:
    config = toml.load("cycle.toml")
    access_token = config["strava"]["access_token"]
    year_goal = int(config["goal"]["year"])
except:
    #TODO syslog this
    pass

@application.route("/cycle")
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
