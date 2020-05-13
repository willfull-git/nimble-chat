const model   = require('../model.js');
const Message = require('./Message');

// Constructor
// -----
module.exports = function(talkers){
  this.status  = 'pending'; // active, pending, disable
  this.id      = model.rooms.length;
  this.talkers = talkers;

  this.activate = function(){
    // Log
    console.log('-- room activate');
    console.log(` - talkers amount ${this.talkers.length}`);
    // console.dir(this.talkers);

    if(!this.talkers.length===2) return;

    this.talkers.forEach((talker)=>{
      talker.send(new Message('active'));
    });

    this.talkers.forEach((talker)=>{
      talker.room = this;
    })

    this.status = 'active';
  }

  this.disable = function(){
    // Log
    console.log(`-- disable room ${this.id}`);

    if(this.status!=='disable') {
      this.status = 'disable';

      // Log
      console.log(' - room disabled');
    } else {
      // Log
      console.log('-- already disabled');
    }
  }
}