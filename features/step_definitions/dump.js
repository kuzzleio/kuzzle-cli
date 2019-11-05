const
  {
    When,
    Then
  } = require('cucumber');

Then(/^I'm able to delete the index named "([^"]*)"$/, function (index) {
  return this.api.deleteIndex(index);
});

Then(/^I count ([\d]*) documents(?: in index "([^"]*)"(:"([\w-]+)")?)?$/, function (number, index, collection) {
  return this.api.count({}, index, collection)
    .then(({ result }) => {
      if (result.count !== parseInt(number)) {
        throw Error(`No correct value for count. Expected ${number}, got ${res.result.count}`);
      }
    });
});

When(/^I create an index named "([^"]*)"$/, function (index) {
  return this.api.createIndex(index);
});

When(/I create a collection "([\w-]+)":"([\w-]+)"( with "([\d]+)" documents)?/, function (index, collection, countRaw) {
  return this.api.createCollection(index, collection)
    .then(() => {
      const
        promises = [],
        count = parseInt(countRaw);

    for (let i = 0; i < count; ++i) {
      promises.push(
        this.api.createDocument({ number: `doc-${i}` }, index, collection));
    }

    return Promise.all(promises);
  });
});

Then(/^I refresh the index(?: "(.*?)")?$/, function (index) {
  return this.api.refreshIndex(index);
});
