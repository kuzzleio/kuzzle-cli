'use strict';

const
  { After, Before } = require('cucumber'),
  { Kuzzle, WebSocket } = require('kuzzle-sdk'),
  World = require('./world');

// Common hooks ================================================================

Before(({ timeout: 10 * 1000 }), async function () {
  const world = new World({});

  this.sdk = new Kuzzle(new WebSocket(world.host, { port: world.port }));

  await this.sdk.connect();

  await this.sdk.query({
    controller: 'admin',
    action: 'resetDatabase',
    refresh: 'wait_for'
  });
});

After(async function () {
  // Clean values stored by the scenario
  this.props = {};

  if (this.sdk && typeof this.sdk.disconnect === 'function') {
    this.sdk.disconnect();
  }
});
