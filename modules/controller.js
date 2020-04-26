const model  = require('./model.js');
const Talker = require('./classTalker.js');
const Room   = require('./classRoom.js');

// Add Talker
// =====
function addTalker(wsc){
  let talker = new Talker('token', wsc);

  // Add new Room or 'ready talker'
  processRoom(talker);

  model.talkers.push(talker);

  // [event] message
  // -----
  wsc.on('message', (msg)=>{
    // Log
    console.log('-- message');
    console.log(' - "' +msg+ '"');
  });

  // [event] close
  // Resolve circular dependency. controller--Talker
  // -----
  wsc.on('close', (code, reason)=>{
    removeTalker(talker);
  });

  // Log
  // -----
  console.log('-- add talker');
  console.log(' - talkers amount:');
  console.log(' - ' +model.talkers.length);
}

// Remoce Talker
// =====
function removeTalker(talker){
  model.talkers.splice(talker.id, 1);

  // Log
  // -----
  console.log('-- remove talker');
  console.log(' - talkers amount:');
  console.log(' - ' +model.talkers.length);
}

// Add Room
// =====
function processRoom(talker){
  // Check for 'ready talker'
  if(model.readyTalker && model.readyTalker instanceof Object){
    let
      room = new Room([model.readyTalker, talker]);

    model.readyTalker = undefined;

    // Log
    console.log('-- add new room');
  } else {
    model.readyTalker = talker;

    // Log
    console.log('-- set ready talker');
  }
}

exports.addTalker    = addTalker;
exports.removeTalker = removeTalker;