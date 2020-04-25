const express = require('express');
const path    = require('path');
const morgan  = require('morgan');
const app     = express();

// HTTP logging
app.use(morgan('dev'));

// Serving static files
app.use(express.static('public'));

// Router
// -----
app
  .get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views/front.html'));
  })
  .get('chat', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views/chat.html'));
  });

// Turn on HTTP server
app.listen(80);