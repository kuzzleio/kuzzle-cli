# Kuzzle CLI

Kuzzle CLI is a CLI written in nodejs to be able to manage Kuzzle.

## Install dependencies

Simply run

```sh
npm install
```

## Available commands

### `createFirstAdmin`

Create the first administrator user.

### clearCache

Clear internal caches in Redis.

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

Create a dump of current state of kuzzle

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

Gracefully exits after processing remaining requests.

## Getting help

You can, of course, get some help by using the --help option.

Try those:

```
$ kuzzle --help
$ kuzzle reset --help
```
