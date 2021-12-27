#!/usr/bin/env

# Install dependencies
sudo yum install docker
sudo yum install nginx
sudo yum install certbot-nginx
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

# Fix bug in nginx install to give nginx user group permission to config
sudo chgrp nginx /etc/nginx/nginx.conf
sudo chgrp nginx /etc/nginx/conf.d/

# Enable nginx on boot 
sudo systemctl enable nginx

# Enable http & https through firewall
sudo firewall-cmd --zone=public --permanent --add-service=http
sudo firewall-cmd --zone=public --permanent --add-service=https
sudo firewall-cmd --reload

# TODO: implement prompts
# echo -n $key > alpha_vantage_api_key.txt
# echo -n $key > free_currconv_api_key.txt 
# echo -n $key > strava_client_id.txt
# echo -n $key > strava_client_secret.txt
# echo -n $key > strava_refresh_token.txt 

export DOMAIN_NAME=staging.nathangrubb.io
export DOCKER_PORT=8000
cat nginx_template.tmp | envsubst | sudo tee /etc/nginx/conf.d/${DOMAIN_NAME}.conf
sudo chgrp nginx /etc/nginx/conf.d/${DOMAIN_NAME}.conf
sudo certbot --nginx -d ${DOMAIN_NAME} -d www.${DOMAIN_NAME}
