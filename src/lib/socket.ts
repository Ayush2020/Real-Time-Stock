// const WebSocket = require('ws');

// const ws = new WebSocket('wss://ws.twelvedata.com/v1/quotes/price?apikey=YOUR_API_KEY');

// ws.on('open', function open() {
//   ws.send(JSON.stringify({
//     action: "subscribe",
//     params: {
//       symbols: "AAPL,MSFT,GOOGL"
//     }
//   }));
// });

// ws.on('message', function message(data) {
//   console.log('Received:', JSON.parse(data));
// });