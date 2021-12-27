#!/usr/bin/env bash

SCRIPT_DIR=$(dirname "$0")
. ${SCRIPT_DIR}/vars.sh
export DOMAIN_NAME=${STAGING_DOMAIN_NAME}
export DOCKER_PORT=${STAGING_DOCKER_PORT}

cat nginx_template.tmp | envsubst | sudo tee /etc/nginx/conf.d/${DOMAIN_NAME}.conf
sudo chgrp nginx /etc/nginx/conf.d/${DOMAIN_NAME}.conf
sudo systemctl reload nginx
sudo certbot --nginx -d ${DOMAIN_NAME} -d www.${DOMAIN_NAME}
./create_staging_containers.sh
