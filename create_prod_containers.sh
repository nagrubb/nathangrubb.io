#!/usr/bin/env bash

SCRIPT_DIR=$(dirname "$0")
. ${SCRIPT_DIR}/vars.sh
git -C ${SCRIPT_DIR} checkout ${PROD_BRANCH}
PORT=${PROD_DOCKER_PORT} TAG=${PROD_DOCKER_TAG} /usr/local/bin/docker-compose -p ${PROD_DOMAIN_NAME} up -d --force-recreate
