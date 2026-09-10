const http = require('http');

http.get('http://127.0.0.1:3000/', (res) => {
  console.log('HTTP Status:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Received HTML bytes:', data.length);
    console.log('Contains Campus Events Hub:', data.includes('Campus Events Hub'));
    console.log('Contains root div:', data.includes('<div id="root"></div>'));
  });
}).on('error', (err) => {
  console.error('Fetch error:', err.message);
});
