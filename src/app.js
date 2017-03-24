const app = require('express')();

app.get('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = app;
