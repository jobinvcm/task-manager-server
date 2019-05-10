const express = require("express");
const cors = require("cors")
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const routes = require('./routes')
app.use(bodyParser.json())
app.use(cors())

routes.getRoutes(app);
routes.postRoutes(app);

app.listen(port, () => console.log(`App running on port ${port}`));
