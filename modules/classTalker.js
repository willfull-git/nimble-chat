const model      = require('./model.js');

// Constructor
// -----
module.exports = (token, wsc)=>{
  this.id     = model.talkers.length;
  this.status = 'active'; // active, disable
  this.token  = token;
  this.wsc    = wsc;
  this.room   = undefined;

  Object.defineProperties(this, {
    "peer": {
      "get": function(){
        if(!this.room) return null;

        let i = this.room.talkers.indexOf(this);

        return this.room.talkers[i? 0: 1];
      },
    }
  });
}