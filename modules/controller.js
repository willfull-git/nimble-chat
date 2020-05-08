const model  = require('./model.js');
const Talker = require('./classTalker.js');
const Room   = require('./classRoom.js');


// Add Talker
// =====
function addTalker(wsc){
  let talker = new Talker('token', wsc);

  model.talkers.push(talker);

  // Add new Room or 'ready talker'
  addRoom(talker);

  // [event] message
  // -----
  wsc.on('message', (txt)=>{
    let
      peer = talker.peer;
      msg  = {
        type: 'message',
        txt:  txt
      };

    peer.wsc.send(JSON.stringify(msg));

    // Log
    console.log('-- message');
    console.log(' - "' +txt+ '"');
  });

  // [event] close
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


// Disable Talker
// =====
function disableTalker(talker){
  let msg = {
    type: 'disable',
    txt:  'Your Peer has leave!'
  };

  talker.wsc.send(JSON.stringify(msg));

  // Log
  // -----
  console.log('-- disable talker');
  console.log(' - '+ msg.txt);
}


// Remove Talker
// =====
function removeTalker(talker){
  model.talkers.splice(talker.id, 1);

  // Log
  // -----
  console.log('-- remove talker');
  console.log(' - talkers amount:');
  console.log(' - ' +model.talkers.length);

  if(talker.room){
    // Log
    console.log(' - remove talker\'s room');
    removeRoom(talker.room, talker.peer);
  }
}


// Add Room
// =====
function addRoom(talker){
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


// Remove Room
// =====
function removeRoom(room, peer){
  model.rooms.splice(room.id, 1);

  room.talkers.forEach((talker)=>{ talker.room = undefined; });

  // Disable disconnected Talker's Peer
  if(peer) disableTalker(peer);

  // Log
  console.log('-- remove room');
}


exports.addTalker    = addTalker;
exports.removeTalker = removeTalker;