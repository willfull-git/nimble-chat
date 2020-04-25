const model  = require('./model.js');
const Talker = require('./classTalker.js');

// Add Talker
// -----
function addTalker(wsc){
  let talker = new Talker(model.clients.length, 'token', wsc);

  model.clients.push(talker);

  wsc.on('message', (msg)=>{
    // Log
    console.log('-- message');
    console.log(' - "' +msg+ '"');
  });

  // Resolve circular dependency. controller--Talker
  wsc.on('close', (code, reason)=>{
    removeTalker(talker);
  });

  // Log
  console.log('-- add talker');
  console.log(' - clients amount:');
  console.log(' - ' +model.clients.length);
}

// Remoce Talker
// -----
function removeTalker(talker){
  model.clients.splice(talker.id, 1);

  // Log
  console.log('-- remove talker');
  console.log(' - clients amount:');
  console.log(' - ' +model.clients.length);
}

exports.addTalker    = addTalker;
exports.removeTalker = removeTalker;