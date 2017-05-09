const app = require('express')();
const bodyParser = require('body-parser');
const todo = require('./route/todo');

app.use(bodyParser.json());

app.route('/todo')
    .get(todo.getTodos)
    .post(todo.postTodo);

module.exports = app;
