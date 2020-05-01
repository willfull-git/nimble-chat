const $ = require('jquery');
const { renderMessage } = require('./render.js');
const { disableClient } = require('./controllerClient.js');

/* ==============================
 * # Web Socket
 * ============================== */

/*
 * # Web Socket - Create Client
 */
const ws = new WebSocket('ws://localhost:80/');

ws.onmessage = function(res){
  let msg = JSON.parse(res.data);

  // Log
  console.log('-- message arrived');
  console.log(msg);

  // Check Message type
  if(msg.type==='disable'){
    disableClient();
  } else if(msg.type==='message'){
    renderMessage(msg, 'stranger');
  }
}

/*
 * Chat Main
 */
const $chatMain = $('.s-chat_main');


/*
 * Chat Form
 */
const $chatForm = $('.s-btm-bar_form');
const $chatInp  = $('.s-btm-bar_form_inp');
const $chatBtn  = $('.s-btm-bar_form_btn');

$chatForm.on('submit', (e)=>{
  e.preventDefault();

  // Log
  console.log('-- submit form');

  // Check if 'status = disable'
  if(ws.status==='disable'){
    // Log
    console.log(' - client is in "disable" status');

    return;
  }

  let message = $chatInp.val();

  if(message){
    ws.send(message);

    renderMessage({txt: message, type: 'message'}, 'self');
  } else {
    // Log
    console.log(' - message is empty!');
  }

  $chatInp.val('');
})