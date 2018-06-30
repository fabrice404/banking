#!/bin/sh
set -e
yarn install --production=false
yarn start --host 0.0.0.0 --port 3010
