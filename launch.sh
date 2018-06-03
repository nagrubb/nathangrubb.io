#!/usr/bin/env bash
sudo docker build -t website .
sudo docker run -p 80:80 -p 443:443 -td website
