/* ==============================
 * # Web Socket
 * ============================== */

/*
 * # Web Socket - Create Client
 */
const ws = new WebSocket('ws://localhost:80/');

ws.onmessage = function(message){
  // Log
  console.log('[ws message]');
  console.log(message);

  renderMessage(message.data, false);
}

/*
 * Chat Main
 */
const $chatMain = jQuery('.s-chat_main');


/*
 * Chat Form
 */
const $chatForm = jQuery('.s-form_main');
const $chatInp  = jQuery('.s-form_main_inp');
const $chatBtn  = jQuery('.s-form_main_btn');

$chatForm.on('submit', (e)=>{
  e.preventDefault();

  let message = $chatInp.val();

  if(message){
    ws.send(message);

    renderMessage(message, true);
  } else {
    // Log
    console.log('Message is empty!');
  }

  $chatInp.val('');
})

function renderMessage(message, self){
  let $message = jQuery('<div class="s-chat_main_message">' +message+ '</div>');

  if(self){
    $message.addClass('m-self');
  };

  $chatMain.append($message);
}
