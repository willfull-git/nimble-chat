const model  = require('./model');
const Talker = require('./classTalker');
const Room   = require('./classRoom');


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

    if(peer)
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
  // Log
  console.log('-- add room');

  // Check for 'ready talker'
  if(model.readyTalker && model.readyTalker instanceof Object){
    // Log
    console.log(' - add new room');

    let
      room = new Room([model.readyTalker, talker]);

    model.readyTalker = undefined;

    let msg = {
      type: 'roomCreated',
      txt:  ''
    }

    talker.wsc.send(JSON.stringify(msg));
    talker.peer.wsc.send(JSON.stringify(msg));
  } else {
    // Log
    console.log(' - set ready talker');

    model.readyTalker = talker;
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