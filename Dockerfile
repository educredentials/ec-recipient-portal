FROM joseluisq/static-web-server:2-alpine

RUN rm /var/public/index.html
COPY index.html /var/public
COPY app.js /var/public
COPY styles.css /var/public

RUN chown -R $SERVER_USER_NAME:$SERVER_GROUP_NAME /var/public
