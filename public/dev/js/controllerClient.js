const { renderMessage } = require('./render.js');

exports.disableClient = (msg, ws)=>{
  console.log('-- disable client');
  console.log(' - ws:' );
  console.log(ws);

  ws.status = 'disable';

  renderMessage(msg)
}