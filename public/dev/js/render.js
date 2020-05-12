const $     = require('jquery');
const $chat = $('.s-chat');
const {
  tmpMessage,
  tmpTyping,
  tmpDisconnect,
  tmpSearching
} = require('./message-templates.js');


// # Render Message
// -----
exports.renderMessage = (msg, type, source)=>{
  let tmp;

  // Log
  console.log('-- render message');

  // Find out 'message type'
  if(type==='message'){
    // Log
    console.log(' - message type: message');
    tmp = tmpMessage(msg, source);

  } else if(type==='typing'){
    tmp = tmpTyping(msg, source);

  } else if(type==='disable'){
    // Log
    console.log(' - message type: disable');
    tmp = tmpDisconnect();
  } else if(type==='searching'){
    // Log
    console.log(' - message type: searching');
    tmp = tmpSearching();
  }

  console.log(' - tmp: ');
  console.log(tmp);

  $chat.append(tmp);
};


// # Destroy Message
// -----
exports.destroyMessage = (type)=>{
  let msg = '';

  if(type==='searching'){
    msg = $('.m-message_searching');
  }

  msg.fadeOut(300, ()=>{
    msg.remove();
  });
}