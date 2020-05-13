const model   = require('../model');
const Room    = require('../classes/Room');
const Talker  = require('../classes/Talker');
const Message = require('../classes/Message');
const { addRoom, removeRoom }
              = require('./room');


// Add Talker
// =====
exports.addTalker = (wsc)=>{
  let talker = new Talker(wsc);

  // Add Talker to Model
  model.talkers.push(talker);

  // Set Ready Talker
  if(!model.readyTalker){
    model.readyTalker = talker;
  }

  // Log
  // -----
  console.log(`-- add talker ${talker.id}`);
  console.log(' - talkers amount: '+ model.talkers.length);

  return talker;
}


// Remove Talker
// =====
exports.removeTalker = (talker)=>{
  model.talkers.splice(talker.id, 1);

  // Log
  console.log(`-- remove talker ${talker.id}`);
  console.log(` - talkers amount: ${model.talkers.length}`);

  if(talker.room){
    // Log
    console.log(' - remove talker\'s room');
    removeRoom(talker.room, talker.peer);
  }
}