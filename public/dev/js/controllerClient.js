const { renderMessage } = require('./render.js');

exports.disableClient = (msg, wsClient)=>{
  console.log('-- disable client');

  wsClient.status = 'disable';

  renderMessage(msg.txt, 'disable');
}