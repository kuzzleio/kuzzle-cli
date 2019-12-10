# Kuzzle CLI

The Kuzzle Command Line Interface.

## Install 

```sh
npm install -g kuzzle-cli
```

## How to use

```
kuzzle <options> <command> <command options>
```

Options:

    -p, --port <port> : Kuzzle port number
    -h, --host <host> : Kuzzle host name or IP address
    -U, --username <username> : Username
    -P, --password <password> : Password
    -d, --debug : Print debug messages
    -C, --noColors : Do not use ANSI coloring
    --help : Get command help    

## Available commands

### `createFirstAdmin`

Create the first administrator user.

### clearCache

Clear Kuzzle internal cache.

### reset

Reset all users, profiles, roles and documents validation specifications

Options:

    --noint : non interactive mode

### decryptSecrets [file]

Decrypt a secrets file with the provided key.

Options:

    --vault-key <vaultKey> : Vault key used to decrypt secrets
    --output-file <outputFile> : Output file to write decrypted secrets
    --noint : non interactive mode

### dump

Create a dump of the current state of a kuzzle instance. The dumped directory can then be found in the `<KUZZLE_ROOT>/dump` directory of the dumped instance.

### encryptSecrets [file]

Encrypt a secrets file with the provided key.

Options:

    --vault-key <vaultKey> : Vault key used to encrypt secrets
    --output-file <outputFile> : Output file to write encrypted secrets
    --noint : non interactive mode

### indexDump <index> <path>

Dump an entire index in the specified directory

Options:

    --batch-size <batchSize> : Maximum batch size (see limits.documentsFetchCount config)

### indexRestore <path>

Restore the content of a previously dumped index.

Options:

    --batch-size <batchSize> : Maximum batch size (see limits.documentsWriteCount config)

### loadMappings <file>

Load database mappings into Kuzzle.

### loadFixtures <file>

Load database fixtures into Kuzzle.

### loadSecurities <file>

Load roles, profiles and users into Kuzzle.

### resetSecurity

Reset all users, profiles and roles.

Options:

    --noint : non interactive mode

### resetDatabase

Remove all data stored on Kuzzle.

Options:    

    --noint : non interactive mode

### shutdown

Initiate a graceful shutdown.
