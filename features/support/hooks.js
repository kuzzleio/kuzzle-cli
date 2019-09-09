const 
  {
    AfterAll
  } = require('cucumber'),
  Api = require('./api'),
  minimist = require('minimist');

AfterAll(async function () {
  const params = parseWorldParameters(),
    api = new Api(params.host, params.port);

  try {
    await api.deleteIndex('tolkien');
  // eslint-disable-next-line no-empty
  } catch (error) {}
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