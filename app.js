const express    = require('express');
const path       = require('path');
const morgan     = require('morgan');
const model      = require('./modules/model.js');
const {addTalker, removeTalker} 
                 = require('./modules/controller.js');
const app        = express();

// # Try
const expressWs = require('express-ws')(app);

// HTTP logging
app.use(morgan('dev'));

// Serving static files
app.use(express.static('public/dist'));

// Router
// -----
app
  .get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views/front.html'));
  })
  .get('/chat', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views/chat.html'));
  })
  .ws('/', (wsc, req)=>{
    addTalker(wsc);
  });

// Turn on HTTP server
app.listen(80);