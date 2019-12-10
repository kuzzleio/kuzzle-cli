const
  rp = require('request-promise');

class Api {
  constructor (host, port) {
    this._baseUri = `http://${host}:${port}`;
  }

  apiPath (path) {
    return encodeURI(this._baseUri + '/' + path);
  }

  async callApi (options) {
    options.json = true;

    const res = await rp(options);

    return res;
  }

  count (query, index, collection) {
    return this.callApi({
      url: this.apiPath(index + '/' + collection + '/_count'),
      method: 'POST',
      body: query
    });
  }

  createCollection (index, collection) {
    return this.callApi({
      url: this.apiPath(`${index}/${collection}`),
      method: 'PUT'
    });
  }

  createDocument (body, index, collection) {
    return this.callApi({
      url: this.apiPath(index + '/' + collection + '/_create'),
      method: 'POST',
      body
    });
  }

  createIndex (index) {
    return this.callApi({
      url: this.apiPath(index + '/_create'),
      method: 'POST'
    });
  }

  deleteIndex (index) {
    return this.callApi({
      url: this.apiPath(index),
      method: 'DELETE'
    });
  }

  refreshCollection (index, collection) {
    return this.callApi({
      url: this.apiPath(`${index}/${collection}/_refresh`),
      method: 'POST'
    });
  }
}

module.exports = Api;
