const model = require('./model.js');

// Constructor
// -----
function Room(talkers){
  this.status  = undefined; // active, pending
  this.id      = model.rooms.length;
  this.talkers = talkers;

  talkers.forEach((v, i)=>{ v.room = this; });
}

module.exports = Room;