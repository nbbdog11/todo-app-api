const ToDoModel = require('../../src/model/todo');
const chai = require('chai');

const expect = chai.expect;

describe('ToDo schema', () => {
  const todo = new ToDoModel();
  it('should have text field', (done) => {
    expect(todo.text).to.not.be.undefined;
    expect(todo.text).to.be.a('string');
    done();
  });
  it('should have completed field', (done) => {
    expect(todo.completed).to.not.be.undefined;
    expect(todo.completed).to.be.a('boolean');
    done();
  });
  it('should have created field', (done) => {
    expect(todo.created).to.not.be.undefined;
    expect(todo.created).to.be.a('date');
    done();
  });
});
