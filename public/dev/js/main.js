const $ = require('jquery');

/* ==============================
 * # Web Socket
 * ============================== */

/*
 * # Web Socket - Create Client
 */
// const ws = new WebSocket('ws://localhost:80/');

// ws.onmessage = function(res){
//   let msg = JSON.parse(res.data);

//   // Log
//   console.log('-- message arrived');
//   console.log(msg);

//   // Check Message type
//   if(msg.type==='disable'){
//     disableClient();
//   } else if(msg.type==='message'){
//     renderMessage(msg.txt, false);
//   }
// }

/*
 * Chat Main
 */
const $chatMain = $('.s-chat_main');


/*
 * Chat Form
 */
const $chatForm = $('.s-form_main');
const $chatInp  = $('.s-form_main_inp');
const $chatBtn  = $('.s-form_main_btn');

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

    renderMessage(message, true);
  } else {
    // Log
    console.log(' - message is empty!');
  }

  $chatInp.val('');
})

function renderMessage(txt, self){
  let $message = $('<div class="s-chat_main_message">' +txt+ '</div>');

  if(self){
    $message.addClass('m-self');
  };

  $chatMain.append($message);
}

function disableClient(){
  console.log('-- disable client');
  console.log(' - ws:' );
  console.log(ws);

  ws.status = 'disable';
}