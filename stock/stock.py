#!/usr/bin/env python3
import toml
from functools import wraps
from flask_cors import CORS
from flask import Flask, jsonify, request, current_app
from alpha_vantage.timeseries import TimeSeries

ts = None
application = Flask(__name__)
CORS(application)

try:
    config = toml.load("stock.toml")
    api_key = config["api_key"]["alpha_vantage"]
    ts = TimeSeries(key=api_key)
except:
    #TODO syslog this
    pass

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

@application.route("/stock/<symbol>")
@jsonp
def stock(symbol):
    if ts is None:
        return

    data, meta_data = ts.get_intraday(symbol)
    print(meta_data)
    last_refresh = meta_data['3. Last Refreshed']
    last_data = data[last_refresh]
    print(last_data)
    closing_price = last_data['4. close']

    return jsonify(
        closing_price=closing_price
    )

if __name__ == "__main__":
    application.run(host='0.0.0.0')
