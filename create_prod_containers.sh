#!/usr/bin/env bash
git checkout master
PORT=9000 TAG=latest /usr/local/bin/docker-compose -p nathangrubb.io up -d --force-recreate
