#!/usr/bin/env python3
import toml
from functools import wraps
from flask import Flask, jsonify
from alpha_vantage.timeseries import TimeSeries

ts = None
application = Flask(__name__)

try:
    config = toml.load("stock.toml")
    api_key = config["api_key"]["alpha_vantage"]
    ts = TimeSeries(key=api_key)
except:
    #TODO syslog this
    pass

@application.route("/stock/<symbol>")
def stock(symbol):
    if ts is None:
        return

    data, meta_data = ts.get_intraday(symbol)
    last_refresh = meta_data['3. Last Refreshed']
    last_data = data[last_refresh]
    closing_price = last_data['4. close']

    return jsonify(
        closing_price=closing_price
    )

if __name__ == "__main__":
    application.run(host='0.0.0.0')
