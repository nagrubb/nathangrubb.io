#!/usr/bin/env bash

SCRIPT_DIR=$(dirname "$0")
. ${SCRIPT_DIR}/vars.sh

git -C ${SCRIPT_DIR} checkout ${STAGING_BRANCH}
PORT=${STAGING_DOCKER_PORT} TAG=${STAGING_DOCKER_TAG} docker-compose -f ${SCRIPT_DIR}/docker-compose.yml -p ${STAGING_DOMAIN_NAME} up -d --force-recreate 
