const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const routes = require('./routes')

routes.getRoutes(app);

app.use(bodyParser.json())
app.listen(port, () => console.log(`App running on port ${port}`));
