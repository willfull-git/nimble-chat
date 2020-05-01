function disableClient(){
  console.log('-- disable client');
  console.log(' - ws:' );
  console.log(ws);

  ws.status = 'disable';
}

exports.disableClient = disableClient;