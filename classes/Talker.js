const model   = require('../model.js');
const Message = require('./Message');
const colors  = require('colors');

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
    console.log('--'.red+' talker send message');
    console.log(' - msg: ' +msg.txt);

    this.wsc.send(msg+'');
  };

  this.sendToPeer = function(msg){
    console.log('-- talker send to peer');
    console.log(' - msg: ' +msg.txt);

    if(this.peer){
      this.peer.wsc.send(msg+'');
    } else {
      console.log(' - peer arent exists');
    }
  }

  this.disable = function(){
    // Log
    console.log(`-- disable talker ${this.id}`);

    if(this.status!=='disable'){
      this.status = 'disable';
      this.wsc.send(new Message('disable')+'');

      // Log
      console.log(' - disabled');
    } else {
      // Log
      console.log(' - talker already disabled');
    }
  }
}