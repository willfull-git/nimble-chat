const model = require('../model.js');

// Constructor
// -----
module.exports = function(wsc){
  this.id     = model.talkers.length;
  this.status = 'pending'; // pending, active, disable
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

  this.send = function(msg){
    console.log('-- talker send message');
    console.log(' - msg: ' +msg.txt);

    this.wsc.send(JSON.stringify(msg));
  }
}