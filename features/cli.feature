Feature: Cli functional tests

  Scenario: Dump and restore index
    And I create an index named "tolkien"
    When I create a collection "tolkien":"noldor" with "5" documents
    And I create a collection "tolkien":"angband" with "3" documents
    And I refresh the index "tolkien"
    And I use the CLI command 'indexDump tolkien ./index-dump'
    Then A file "index-dump/tolkien--noldor--data.jsonl" exists
    And A file "index-dump/tolkien--angband--data.jsonl" exists
    And a file "index-dump/tolkien--noldor--data.jsonl" contain 6 documents
    And a file "index-dump/tolkien--angband--data.jsonl" contain 4 documents
    When I'm able to delete the index named "tolkien"
    And I create an index named "tolkien"
    When I create a collection "tolkien":"noldor"
    And I create a collection "tolkien":"angband"
    And I use the CLI command 'indexRestore ./index-dump'
    And I refresh the index "tolkien"
    Then I count 5 documents in index "tolkien":"noldor"
    Then I count 3 documents in index "tolkien":"angband"

  Scenario: Encrypt and decrypt secrets
    When I have a file "features/fixture/testsecrets.json" containing '{ "aws": { "key": "silmaril" }, "secret": "ring" }'
    And I use the CLI command 'encryptSecrets features/fixture/testsecrets.json --noint --vault-key azerty --output-file features/fixture/testsecrets.enc.json'
    Then A file "features/fixture/testsecrets.enc.json" exists
    When I use the CLI command 'decryptSecrets features/fixture/testsecrets.enc.json --noint --vault-key azerty --output-file features/fixture/testsecrets.json'
    Then A file "features/fixture/testsecrets.json" exists and contain '{ "aws": { "key": "silmaril" }, "secret": "ring" }'
