const 
  {setWorldConstructor} = require('cucumber'),
  Api = require('./api');

class CLIWorld {
  constructor (config) {
    this.config = Object.assign({
      host: 'localhost',
      port: 7512
    }, config.parameters);

    this.api = new Api(this.config.host, this.config.port);
  }
}

setWorldConstructor(CLIWorld);

module.exports = CLIWorld;
