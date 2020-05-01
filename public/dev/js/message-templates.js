const $      = require('jquery');

// # Template - Message
// -----
const tmpMessage = function(txt, source){
  let
    time          = new Date(),
    timeFormatted = time.getHours()+':'+time.getMinutes(),
    sourceClass   = source==='self'? 'm-message_right': 'm-message_left';

  return `
    <div class="
      b-message
      ${sourceClass}
    ">
      <div class="
        b-message_main
      ">
        <div class="
          b-message_main_txt
        ">
          ${txt}
        </div>

        <div class="
          b-message_main_time
        ">
          ${timeFormatted}
        </div>
      </div>
    </div>
  `;
}


// # Template - Typing
// -----
const tmpTyping = function(txt){
  `
    
  `;
}


// # Template - Disconnect
// -----
const tmpDisconnect = function(txt){
  `
    
  `;
}


exports.tmpMessage    = tmpMessage;
exports.tmpTyping     = tmpTyping;
exports.tmpDisconnect = tmpDisconnect;