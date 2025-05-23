const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(`
    <html>
      <head><title>Home</title></head>
      <body>
        <h1>Welcome to the Home Page</h1>
        <p>This is a simple Node.js server.</p>
      </body>
    </html>
  `);
});

app.get('/about', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('About us: at CADT, we love node.js!');
});

app.get('/contact-us', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('You can reach us via email...');
});

app.get('/products', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('Buy one get one...');
});

app.get('/projects', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('Here are our awesome projects');
});

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});