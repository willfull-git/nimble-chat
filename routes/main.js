const router = require('express').Router();
const path   = require('path');

router
  .get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/front.html'));
  })
  .get('/chat', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/chat.html'));
  })

module.exports = router;