const model      = require('./model.js');
const {addTalker, removeTalker}
                 = require('./controller.js');

// Constructor
// -----
function Talker(id, token, wsc){
  this.status = 'active'; // active, offline
  this.id     = id;
  this.token  = token;
  this.wsc    = wsc;
  this.room   = undefined;
}

module.exports = Talker;