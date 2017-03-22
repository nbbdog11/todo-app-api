const app = require('express')();

app.get('/', (req, res) => {
  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`listening at: ${port}`);

module.exports = app;
