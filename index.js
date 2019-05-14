const express = require("express");
const cors = require("cors")
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const port = 9000;
const bodyParser = require('body-parser');
const routes = require('./routes')
app.use(bodyParser.json())
app.use(helmet());

app.use(cors())
app.use(morgan('combined'));


routes.getRoutes(app);
routes.postRoutes(app);

app.listen(port, () => console.log(`App running on port ${port}`));
