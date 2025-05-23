const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('Welcome to the Home Page');
});

app.get('/contact', (req, res) => {
  res.send(`
    <form method="POST" action="/contact">
      <input type="text" name="name" placeholder="Your name" />
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/contact', (req, res) => {
  const name = req.body.name || '';
  
  console.log(`Received name: ${name}`);

  if (!name.trim()) {
    return res.status(400).send(`
      <p>Error: Name cannot be empty</p>
      <a href="/contact">Go back</a>
    `);
  }

  const filePath = 'submissions.json';
  let data = [];

  if (fs.existsSync(filePath)) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      data = JSON.parse(fileContent);
    } catch (err) {
      console.error('Error reading JSON file:', err);
    }
  }

  data.push({ name });

  fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    res.send(`
      <h1>Thank you, ${name}!</h1>
      <p>Your name has been saved successfully.</p>
      <a href="/contact">Back to form</a>
    `);
  });
});

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});