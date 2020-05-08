const $ = require('jquery');
const { renderMessage } = require('./render.js');
const { tmpSearching }  = require('./message-templates.js');
const WsClient = require('./WsClient.js');


// Invoke on Document [ready]
$(document).ready(()=>{

// Chat Main
const $chatMain = $('.s-chat_main');

// Chat Form
const $chatForm = $('.s-btm-bar_form');
const $chatInp  = $('.s-btm-bar_form_inp');
const $chatBtn  = $('.s-btm-bar_form_btn');

// Create Client obj
let wsClient = new WsClient;

$chatForm.on('submit', (e)=>{
  e.preventDefault();

  // Log
  console.log('-- submit form');

  // Check if 'status = disable'
  if(ws.status || ws.status==='disable'){
    // Log
    console.log(' - client is in "disable" status');

    return;
  }

  let message = $chatInp.val();

  if(message){
    ws.send(message);

    renderMessage(message, 'message', 'self');
  } else {
    // Log
    console.log(' - message is empty!');
  }

  $chatInp.val('');
})

});