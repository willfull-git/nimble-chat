const $ = require('jquery');

// # Template - Message
// -----
exports.tmpMessage = (txt, source)=>{
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
exports.tmpTyping = (txt)=>{
  `
    
  `;
}


// # Template - Disconnect
// -----
exports.tmpDisconnect = ()=>{
  return `
    <div class="
      b-message
      m-message_disconnect
    ">
      <div class="
        b-message_main
      ">
        <div class="
          b-message_main_txt
        ">
          Talker disconnected! <button id="btn-start-new" type="button">Start new chat</button>
        </div>
      </div>
    </div>
  `;
}


// # Template - Disconnect
// -----
exports.tmpSearching = ()=>{
  return `
    <div class="
      b-message
      m-message_searching
    ">
      <div class="
        b-message_main
      ">
        <div class="
          b-message_main_txt
        ">
          Searching Talker..
        </div>
      </div>
    </div>
  `
}