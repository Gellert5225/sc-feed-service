module.exports = function(app) {
  app.get('/', (req, res) => {
    req.headers['x-header'] = 'test value';
    res.status(200).send({ status: 'Feed service is healthy!!!' });
  });
}