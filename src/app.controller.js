module.exports = function(app) {
  app.get('/', (req, res) => {
    req.headers.authorization = "test auth";
    res.status(200).send({ status: 'Feed service is healthy!' });
  });
}