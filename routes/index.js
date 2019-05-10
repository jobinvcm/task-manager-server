const firebaseController = require('../controller/firebaseController')
const multer = require('multer');
const uploadFile = multer();

function getRoutes(app) {
  app.get('/', function (req, res) {
    res.send('Home Page')
  })
  app.get('/tas', function(req, res) {
    firebaseController.addContent('/task', {update: 'value'})
    res.send('sure')
  })
}

function postRoutes(app) {
  app.post('/add-user', function (req, res) {
    var reqBody = req.body
    console.log(firebaseController, 'req body')

    if (reqBody.username && reqBody.password) {
      firebaseController.addUser(reqBody)
    }
    res.send('invalid route')
  });

  app.post('/upload-file', function (req, res) {
    console.log(req.files)
  })

}

exports.getRoutes = function (app) {
  getRoutes(app)
}

exports.postRoutes = function (app) {
  postRoutes(app)
}
