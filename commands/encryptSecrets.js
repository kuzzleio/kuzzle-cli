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
  fs = require('fs'),
  path = require('path'),
  readlineSync = require('readline-sync'),
  ColorOutput = require('./colorOutput'),
  Vault = require('kuzzle-vault');

function commandEncryptSecrets (file, options) {
  const
    secretsFile = file,
    cout = new ColorOutput(options);

  if (!options.vaultKey) {
    cout.error('[ℹ] You must provide the vault key with --vault-key <key>');
    process.exit(1);
  }

  let
    userIsSure,
    outputFile = options.outputFile;

  if (!options.outputFile) {
    outputFile = path.resolve(`${path.dirname(secretsFile)}/${path.basename(secretsFile, '.json')}.enc.json`);
  }

  if (fs.existsSync(outputFile) && !options.noint) {
    cout.warn(`[ℹ] You are going to overwrite the following file: ${outputFile}`);
    userIsSure = readlineSync.question('[❓] Are you sure? If so, please type "yes": ') === 'yes';
  } else {
    // non-interactive mode
    userIsSure = true;
  }

  if (!userIsSure) {
    cout.notice('[ℹ] Aborted');
    process.exit(1);
  }

  cout.notice('[ℹ] Encrypting secrets...\n');

  try {
    const vault = new Vault(options.vaultKey, secretsFile, outputFile);

    vault.encrypt(outputFile, true);
    cout.ok(`[✔] Secrets successfully encrypted: ${outputFile}`);
    process.exit(0);
  } catch (error) {
    cout.error(`[ℹ] Can not encrypt secret file: ${error.message}`);
    process.exit(1);
  }
}

module.exports = commandEncryptSecrets;
