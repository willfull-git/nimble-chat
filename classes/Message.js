// Constructor
// -----
module.exports = function(type, txt){
  this.type = type;
  this.txt  = '';

  switch(type){
    case 'message':
      this.txt = txt;
      break;
    case 'active':
      this.txt = 'Chat started';
      break;
    case 'disable':
      this.txt = 'Chat ended';
      break;
  }
}