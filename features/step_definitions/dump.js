const
  {
    When,
    Then
  } = require('cucumber');

Then('I\'m able to delete the index named {string}', async function (index) {
  await this.sdk.index.delete(index);
});

Then('I count {int} documents in collection {string}:{string}', async function (number, index, collection) {
  const count = await this.sdk.document.count(index, collection, {});

  if (count !== parseInt(number)) {
    throw Error(`No correct value for count. Expected ${number}, got ${count}`);
  }
});

When('I create an index named {string}', async function (index) {
  await this.sdk.index.create(index);
});

When(/I create a collection "([\w-]+)":"([\w-]+)"( with "([\d]+)" documents)?/, async function (index, collection, countRaw) {
  await this.sdk.collection.create(index, collection);

  const
    count = parseInt(countRaw);

  for (let i = 0; i < count; ++i) {
    await this.sdk.document.create(index, collection, { number: `doc-${i}` });
  }
});

Then('I refresh the collection {string}:{string}', async function (index, collection) {
  await this.sdk.collection.refresh(index, collection);
});
