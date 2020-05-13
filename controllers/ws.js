const Talker  = require('../classes/Talker');
const Message = require('../classes/Message');
const { addRoom, removeRoom }
              = require('../services/room');
const { addTalker, disableTalker, removeTalker } 
              = require('../services/talker');

module.exports = (wsc, req)=>{
  const talker = addTalker(wsc);
  const room   = addRoom(talker);

  wsc.on('message', (msgTxt)=>{
    // Log
    console.log('-- [ws message]');

    talker.sendToPeer(new Message('message', msgTxt));

    console.log(new Message('message', msgTxt));

    // Log
    console.log('-- message');
    console.log(' - "' +msgTxt+ '"');
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
