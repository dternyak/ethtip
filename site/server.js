/* eslint-disable no-console */
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');

const port = parseInt(process.env.PORT, 10) || 3000;
const env = process.env.NODE_ENV;
const dev = env !== 'production';
const app = next({
  dir: 'src', // base directory where everything is, could move to src later
  dev
});

const handle = app.getRequestHandler();

let server;
app
  .prepare()
  .then(() => {
    server = express();
    server.use(bodyParser.json());

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all('*', (req, res) => handle(req, res));

    server.listen(port, err => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on port ${port}`);
    });
  })
  .catch(err => {
    console.log('An error occurred, unable to start the server');
    console.log(err);
  });
