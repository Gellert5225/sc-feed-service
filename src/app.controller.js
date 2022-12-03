const http = require('http')

module.exports = function(app) {
  app.get('/', (req, res) => {  
    res.status(200).send({ status: 'Feed service is healthy!!!' });
  });
}