const model      = require('./model.js');

// Constructor
// -----
function Talker(token, wsc){
  this.id     = model.talkers.length;
  this.status = 'active'; // active, offline
  this.token  = token;
  this.wsc    = wsc;
  this.room   = undefined;
}

module.exports = Talker;