#! /bin/sh

sh -c pm2 start ./backend/server.js && \
sh -c yarn --cwd ./frontend start