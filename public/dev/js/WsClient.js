const { renderMessage, destroyMessage } = require('./render');
const { disableClient } = require('./controllerClient');

// Constructor
// -----
module.exports = function(){
  this.status = 'active'; // active, disable
  this.wsc    = new WebSocket('ws://localhost:80/');

  this.wsc.onmessage = onMessage;

  // Render Searching message
  renderMessage('', 'searching');
}

function onMessage(res){
  let msg = JSON.parse(res.data);

  // Log
  console.log('-- message arrived');
  console.log(msg);

  // Check Message type
  if(msg.type==='disable'){
    disableClient(msg.txt, 'disable', this);
  } else if(msg.type==='message'){
    renderMessage(msg.txt, 'message', 'stranger');
  } else if(msg.type==='roomCreated'){
    destroyMessage('searching');
  }
}