const
  {
    AfterAll
  } = require('cucumber'),
  Api = require('./api'),
  minimist = require('minimist');

AfterAll(function () {
  const
    params = parseWorldParameters(),
    api = new Api(params.host, params.port);

  return api.deleteIndex('tolkien')
      .catch(() => {});
});

function parseWorldParameters() {
  const
    argv = minimist(process.argv.slice(2)),
    parameters = Object.assign({
      protocol: 'http',
      host: 'localhost',
      port: 7512,
      silent: true
    }, JSON.parse(argv['world-parameters'] || '{}'));

  return parameters;
}