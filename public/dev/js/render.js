const $     = require('jquery');
const $chat = $('.s-chat');
const { tmpMessage, tmpTyping, tmpDisconnect } = require('./message-templates.js');


// # Render Message
// -----
function renderMessage(msg, source){
  let tmp;

  // Log
  console.log('-- render message');

  // Find out 'message type'
  if(msg.type==='message'){
    // Log
    console.log(' - message type message');
    tmp = tmpMessage(msg.txt, source);

  } else if(msg.type==='typing'){
    tmp = tmpTyping(msg.txt, source);

  } else if(msg.type==='disconnect'){
    tmp = tmpDisconnect(msg.txt);
  }

  console.log(' - tmp: ');
  console.log(tmp);

  $chat.append(tmp);
};

exports.renderMessage = renderMessage;