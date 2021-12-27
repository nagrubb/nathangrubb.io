#!/usr/bin/env bash
git checkout staging
PORT=8000 TAG=staging /usr/local/bin/docker-compose -p staging.nathangrubb.io up -d --force-recreate
