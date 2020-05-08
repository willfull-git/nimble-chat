const model = require('./model.js');

// Constructor
// -----
module.exports = (talkers)=>{
  this.status  = undefined; // active, pending
  this.id      = model.rooms.length;
  this.talkers = talkers;

  talkers.forEach((v, i)=>{ v.room = this; });
}