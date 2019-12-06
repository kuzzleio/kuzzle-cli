/*
 * Kuzzle, a backend software, self-hostable and ready to use
 * to power modern apps
 *
 * Copyright 2015-2018 Kuzzle
 * mailto: support AT kuzzle.io
 * website: http://kuzzle.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const
  readlineSync = require('readline-sync'),
  ColorOutput = require('./colorOutput'),
  getSdk = require('./getSdk');

/** @type ColorOutput */
let cout;

function getUserName () {
  const username = readlineSync.question(cout.format.question('\n[❓] First administrator account name\n'));

  if (username.length === 0) {
    return getUserName();
  }

  return username;
}

function getPassword () {
  const password = readlineSync.question(
    cout.format.question('\n[❓] First administrator account password\n'),
    {hideEchoBack: true});

  const confirmation = readlineSync.question(
    cout.format.question('Please confirm your password\n'),
    {hideEchoBack: true});

  if (password !== confirmation) {
    cout.error('[✖] Passwords do not match.');
    return getPassword();
  }

  return password;
}

function shouldWeResetRoles () {
  readlineSync.keyInYN(
    cout.format.question('[❓] Restrict rights of the default and anonymous roles?'));
}

function confirm (username, resetRoles) {
  let msg = `\n[❓] About to create the administrator account "${username}"`;

  if (resetRoles) {
    msg += ' and restrict rights of the default and anonymous roles';
  }

  msg += '.\nConfirm? ';

  return readlineSync.keyInYN(cout.format.question(msg));
}

async function commandCreateFirstAdmin (options) {
  cout = new ColorOutput(options);

  process.stdin.setEncoding('utf8');

  const
    sdk = await getSdk(options),
    adminExists = await sdk.server.adminExists();

  if (adminExists) {
    cout.error('An administrator account already exists.');
    process.exit(1);
  }

  const
    username = getUserName(),
    password = getPassword(),
    resetRoles = shouldWeResetRoles();

  const response = confirm(username, resetRoles);

  if (!response) {
    cout.error('Abort.');
    process.exit(1);
  }

  const adminUser = {
    content: { },
    credentials: {
      local: {
        username,
        password
      }
    }
  };

  await sdk.security.createFirstAdmin(username, adminUser, {reset: resetRoles});
  cout.ok(`[✔] "${username}" administrator account created`);

  if (resetRoles) {
    cout.ok('[✔] Rights restriction applied to the following roles: ');
    cout.ok('   - default');
    cout.ok('   - anonymous');
  }

  process.exit(0);
}

module.exports = async options => {
  try {
    await commandCreateFirstAdmin(options);
  }
  catch (e) {
    cout.error(e.message);
    process.exit(1);
  }
};

