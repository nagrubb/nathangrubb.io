#!/usr/bin/env bash

SCRIPT_DIR=$(dirname "$0")
. ${SCRIPT_DIR}/vars.sh

git -C ${SCRIPT_DIR} checkout ${PROD_BRANCH}
PORT=${PROD_DOCKER_PORT} TAG=${PROD_DOCKER_TAG} docker-compose -f ${SCRIPT_DIR}/docker-compose.yml -p ${PROD_DOMAIN_NAME} up -d --force-recreate
