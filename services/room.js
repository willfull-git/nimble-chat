const model   = require('../model');
const Room    = require('../classes/Room');
const Talker  = require('../classes/Talker');
const Message = require('../classes/Message');

// Add Room
// =====
exports.addRoom = (talker)=>{
  // Log
  console.log('-- add room');

  // Check for 'ready talker'
  if(
    model.readyTalker
    &&
    model.readyTalker instanceof Object
    &&
    model.readyTalker!==talker
  ){
    // Log
    console.log(' - add new room');

    const room = new Room([talker, model.readyTalker]);

    model.readyTalker = undefined;
    room.activate();

    return room;
  }

  // Log
  console.log(' - no ready talker present');

  return null;
}


// Remove Room
// =====
exports.removeRoom = (room, peer)=>{
  model.rooms.splice(room.id, 1);

  room.talkers.forEach((talker)=>{ talker.room = undefined; });

  // Disable disconnected Talker's Peer
  if(peer) disableTalker(peer);

  // Log
  console.log('-- remove room');
}