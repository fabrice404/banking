FROM node:latest
LABEL maintainer="Fabrice Lamant <fabrice.lamant@gmail.com>"

WORKDIR /var/www
ADD docker/entrypoint.sh /entrypoint.sh

EXPOSE 3010

CMD ["/entrypoint.sh"]
