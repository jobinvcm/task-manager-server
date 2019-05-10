const firebaseController = require('../controller/firebaseController')
firebaseController.firebaseInit();

function getRoutes(app) {
  app.get('/', function (req, res) {
    res.send('Home Page')
  })

  app.get('/tas', function(req, res) {
    
    firebaseController.addContent('/task', {update: 'value'})
    res.send('sure')
  })
}

exports.getRoutes = function (app) {
  getRoutes(app)
}
