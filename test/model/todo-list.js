const ToDoListModel = require('../../src/model/todo-list');
const chai = require('chai');

const expect = chai.expect;

describe('ToDoList schema', () => {
  const todoList = new ToDoListModel();
  it('should have name field', (done) => {
    expect(todoList.name).to.not.be.undefined;
    expect(todoList.name).to.be.a('string');
    done();
  });
  it('should have items field', (done) => {
    expect(todoList.items).to.not.be.undefined;
    expect(todoList.items).to.be.a('array');
    done();
  });
  it('should have created field', (done) => {
    expect(todoList.created).to.not.be.undefined;
    expect(todoList.created).to.be.a('date');
    done();
  });
});
