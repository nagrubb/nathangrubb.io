export DOMAIN_NAME=nathangrubb.io
export DOCKER_PORT=9000
cat nginx_template.tmp | envsubst | sudo tee /etc/nginx/conf.d/${DOMAIN_NAME}.conf
sudo chgrp nginx /etc/nginx/conf.d/${DOMAIN_NAME}.conf
sudo systemctl reload nginx
sudo certbot --nginx -d ${DOMAIN_NAME} -d www.${DOMAIN_NAME}
./create_prod_containers.sh
