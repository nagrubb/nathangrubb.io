FROM ubuntu:18.04
MAINTAINER Nathan Grubb

RUN apt update -y && apt upgrade -y
RUN apt install -y systemd python3 python3-pip nginx
RUN apt install -y lsb-core vim
RUN pip3 install uwsgi flask stravalib alpha-vantage Flask-Cors toml

COPY init.d/uwsgi /etc/init.d/
RUN chmod +x /etc/init.d/uwsgi

COPY nginx /etc/nginx
COPY vassals/* /etc/uwsgi/vassals/

CMD service nginx start

# Create web user and switch to this user
RUN useradd --create-home --shell /bin/bash webuser
USER webuser
WORKDIR /home/webuser

# Copy web applications
COPY --chown=webuser html /home/webuser/html
COPY --chown=webuser cycle /home/webuser/cycle
COPY --chown=webuser stock /home/webuser/stock

USER root
ENTRYPOINT service nginx start && service uwsgi start && bash
