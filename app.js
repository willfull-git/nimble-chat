const path       = require('path');
const morgan     = require('morgan');

const express    = require('express');
const app        = express();
const expressWs  = require('express-ws')(app);

const httpController = require('./controllers/http');
const wsController   = require('./controllers/ws');

// HTTP logging
app.use(morgan('dev'));

// Serving static files
app.use(express.static('public/dist'));
app.use(express.static('public/fnt'));
app.use(express.static('public/img'));

// Router
// -----
app
  .get('/', httpController)
  .ws('/', wsController);

// Turn on HTTP server
app.listen(80);