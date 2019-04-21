const express = require('express');

const app = express();

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  app.use(express.static('public/'));

  // Express will serve the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  })
}

const PORT = process.env.PORT || 8090;

app.listen(PORT);

console.log('server running on port: ' + PORT + '\n environment = ' + process.env.NODE_ENV);