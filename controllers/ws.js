const Talker  = require('../classes/Talker');
const Message = require('../classes/Message');
const { addRoom, removeRoom }
              = require('../services/room');
const { addTalker, disableTalker, removeTalker } 
              = require('../services/talker');

module.exports = (wsc, req)=>{
  const talker = addTalker(wsc);
  const room   = addRoom(talker);

  wsc.on('message', (msg)=>{
    // Log
    console.log('-- [ws message]');

    talker.send(new Message('message', msg.data));

    // Log
    console.log('-- message');
    console.log(' - "' +msg.data+ '"');
  });

  wsc.on('close', (code, reason)=>{
    // Log
    console.log('-- [ws close]');

    removeTalker(talker);
  });

  wsc.on('error', (err)=>{
    // Log
    console.log('-- [ws error]');
  });
}
