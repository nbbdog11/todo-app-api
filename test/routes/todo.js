const Todo = require('../../src/model/todo');
const server = require('../../src/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;

const mockgoose = new Mockgoose(mongoose);
const expect = chai.expect;
chai.use(chaiHttp);

describe('ToDo routes', () => {
  const expectedTodos = [
    { text: 'todo1' },
    { text: 'todo2' },
  ];

  before((done) => {
    mongoose.connect('mongodb://localhost/test', err => done(err));
    Todo.create(expectedTodos);
  });

  after(() => {
    Todo.remove({}, err => console.error(err));
    mockgoose.helper.reset();
    mongoose.connection.close();
  });

  describe('/GET', () => {
    it('responds with a 200', (done) => {
      chai.request(server)
        .get('/todo')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('responds with existing todos', (done) => {
      chai.request(server)
        .get('/todo')
        .end((err, res) => {
          const responseBody = res.body;
          expect(responseBody).to.have.lengthOf(expectedTodos.length);
          expect(responseBody[0].text).to.equal(expectedTodos[0].text);
          expect(responseBody[1].text).to.equal(expectedTodos[1].text);
          done();
        });
    });
  });

  describe('/POST', () => {
    const newTodo = {
      text: 'new todo',
    };
    describe('when todo is valid', () => {
      after(() => Todo.remove(newTodo, err => console.error(err)));
      it('responds with new todo', (done) => {
        chai.request(server)
          .post('/todo')
          .send(newTodo)
          .end((err, res) => {
            expect(res.body).to.be.a('object');
            expect(res.body.text).to.equal(newTodo.text);
            done();
          });
      });
      it('adds new todo to existing todos', (done) => {
        chai.request(server)
          .post('/todo')
          .send(newTodo);
        chai.request(server)
          .get('/todo')
          .end((err, res) => {
            expect(res.body).to.have.lengthOf(expectedTodos.length + 1);
            done();
          });
      });
    });
    describe('when todo is invalid', () => {
      const invalidTodo = {
        invalidField: 'bad',
      };
      it('responds with error', (done) => {
        chai.request(server)
          .post('/todo')
          .send(invalidTodo)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
          });
      });
      it('does not add todo to list', (done) => {
        chai.request(server)
          .post('/todo')
          .send(invalidTodo);
        chai.request(server)
          .get('/todo')
          .end((err, res) => {
            expect(res.body).to.have.lengthOf(expectedTodos.length);
            done();
          });
      });
    });
  });

  describe('/GET/:id', () => {
    it('should get the todo for given id', (done) => {
      const todoText = 'new';
      const newTodo = new Todo({ text: todoText });
      newTodo.save((error, todo) => {
        chai.request(server)
        .get(`/todo/${todo.id}`)
        .end((err, res) => {
          expect(res.body._id).to.equal(todo.id);
          expect(res.body.text).to.equal(todoText);
          done();
        });
      });
    });
    it('responds with 404 when todo is not found', (done) => {
      const todoText = 'new';
      const newTodo = new Todo({ text: todoText });
      newTodo.save(() => {
        chai.request(server)
        .get('/todo/123')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
});
