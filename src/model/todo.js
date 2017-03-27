const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ToDoSchema = Schema({
  text: {
    type: String,
    default: '',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ToDo', ToDoSchema);
