#!/usr/bin/env bash

SCRIPT_DIR=$(dirname "$0")
. ${SCRIPT_DIR}/vars.sh
git -C ${SCRIPT_DIR} checkout ${STAGING_BRANCH}
PORT=${STAGING_DOCKER_PORT} TAG=${STAGING_DOCKER_TAG} /usr/local/bin/docker-compose -p ${STAGING_DOMAIN_NAME} up -d --force-recreate
