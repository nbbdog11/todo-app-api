const app = require('express')();
const bodyParser = require('body-parser');
const todo = require('./route/todo');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.route('/todo')
    .get(todo.getTodos)
    .post(todo.postTodo);

app.route('/todo/:id')
    .get(todo.getTodo);

module.exports = app;
