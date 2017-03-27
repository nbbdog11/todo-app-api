const mongoose = require('mongoose');
const ToDoModel = require('./todo');

const Schema = mongoose.Schema;

const ToDoListSchema = Schema({
  name: {
    type: String,
    default: '',
  },
  items: [{ type: Schema.Types.ObjectId, ref: ToDoModel.modelName }],
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ToDoList', ToDoListSchema);
