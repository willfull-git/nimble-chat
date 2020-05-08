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


// [submit] Form
// -----
$chatForm.on('submit', (e)=>{
  e.preventDefault();

  // Log
  console.log('-- submit form');
  console.log(wsClient);

  // Check if 'status = disable'
  if(wsClient.status && wsClient.status==='disable'){
    // Log
    console.log(' - client is in "disable" status');

    return;
  }

  let message = $chatInp.val();

  if(message){
    wsClient.wsc.send(message);

    renderMessage(message, 'message', 'self');
  } else {
    // Log
    console.log(' - message is empty!');
  }

  $chatInp.val('');
})

});