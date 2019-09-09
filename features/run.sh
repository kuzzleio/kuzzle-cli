#!/usr/bin/env bash

set -e

host="${CUCUMBER_HOST:-localhost}"
port="${CUCUMBER_PORT:-7512}"

./node_modules/.bin/cucumber-js --format progress-bar --world-parameters "{\"host\": \"${host}\", \"port\": \"${port}\"}"
