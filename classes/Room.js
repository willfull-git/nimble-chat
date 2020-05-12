const model   = require('../model.js');
const Message = require('./Message');

// Constructor
// -----
module.exports = function(talkers){
  this.status  = 'pending'; // active, pending, disable
  this.id      = model.rooms.length;
  this.talkers = talkers;

  this.activate = function(){
    if(!talkers.length===2) return;

    this.status = 'active';
    this.talkers.forEach((talker)=>{
      talker.send(new Message('active'));
    });
  }
}