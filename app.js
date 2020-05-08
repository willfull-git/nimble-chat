const express    = require('express');
const path       = require('path');
const morgan     = require('morgan');
const routerMain = require('./routes/main');
const model      = require('./modules/model');
const {addTalker, removeTalker} 
                 = require('./modules/controller');
const app        = express();

// # Try
const expressWs = require('express-ws')(app);

// HTTP logging
app.use(morgan('dev'));

// Serving static files
app.use(express.static('public/dist'));
app.use(express.static('public/fnt'));
app.use(express.static('public/img'));

// Router
// -----
app.use(routerMain);

app.ws('/', (wsc, req)=>{
  addTalker(wsc);
});

// Turn on HTTP server
app.listen(80);