const Todo = require('../model/todo');

const getTodos = (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) {
      res.send(err);
    }
    res.json(todos);
  });
};

const getTodo = (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) {
      res.status(404).send(err);
    }
    res.json(todo);
  });
};

const postTodo = (req, res) => {
  const newTodo = new Todo(req.body);
  newTodo.save((err, todo) => {
    if (err) {
      res.status(400).send(err);
    }
    res.json(todo);
  });
};

module.exports = {
  getTodos,
  getTodo,
  postTodo,
};
