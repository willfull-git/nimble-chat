const { renderMessage } = require('./render');
const { disableClient } = require('./controllerClient');
const { tmpSearching }  = require('./message-templates');

// Constructor
// -----
module.exports = function(){
  this.status = 'active'; // active, disable
  this.wsc    = new WebSocket('ws://localhost:80/');

  this.wsc.onmessage = onMessage;

  // Render Searching message
  renderMessage(tmpSearching, 'searching');
}

function onMessage(res){
  let msg = JSON.parse(res.data);

  // Log
  console.log('-- message arrived');
  console.log(msg);

  // Check Message type
  if(msg.type==='disable'){
    disableClient(msg, ws);
  } else if(msg.type==='message'){
    renderMessage(msg, 'stranger');
  }
}