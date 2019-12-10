const
  {
    When,
    Then
  } = require('cucumber');

Then(/^I'm able to delete the index named "([^"]*)"$/, async function (index) {
  await this.api.deleteIndex(index);
});

Then(/^I count ([\d]*) documents(?: in index "([^"]*)"(:"([\w-]+)")?)?$/, async function (number, index, collection) {
  const res = await this.api.count({}, index, collection);

  if (res.result.count !== parseInt(number)) {
    throw Error(`No correct value for count. Expected ${number}, got ${res.result.count}`);
  }
});

When(/^I create an index named "([^"]*)"$/, async function (index) {
  const { status, error } = await this.api.createIndex(index);

  if (status !== 200) {
    throw new Error(`Index creation failed. Error: ${error.message}`);
  }
});

When(/I create a collection "([\w-]+)":"([\w-]+)"( with "([\d]+)" documents)?/, async function (index, collection, countRaw) {
  await this.api.createCollection(index, collection);

  const
    count = parseInt(countRaw);

  for (let i = 0; i < count; ++i) {
    await this.api.createDocument({ number: `doc-${i}` }, index, collection);
  }
});

Then(/^I refresh the collection "(.*?)":"(.*?)"?$/, async function (index, collection) {
  await this.api.refreshCollection(index, collection);
});

