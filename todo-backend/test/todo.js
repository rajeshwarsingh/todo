require('dotenv').config();
process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
const db = require("../models");
let server = require('../app');
let should = chai.should();
const Task = require('../controllers/tasks')

chai.use(chaiHttp);

describe('TODO', () => {
    before((done) => {
        //Before each test we re create the database
        db.sequelize.sync({ force: true }).then(() => {
            done()
            console.log("Drop and re-sync db.");
        });

    });

    describe('Test todo todo tasks', () => {

        it('it should not create todo specified task', (done) => {

            let body = {
            }

            chai.request(server)
                .post('/tasks')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an('object');
                    done();
                });
        });

        it('it should create todo specified task', (done) => {

            let body = {
                "title": "todo task one"
            }

            chai.request(server)
                .post('/tasks')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    done();
                });
        });

        it('it should GET all the todo tasks', (done) => {
            chai.request(server)
                .get('/tasks')
                .then(res => {
                    res.statusCode.should.be.eql(200)
                    res.body.should.be.a('array');
                    done()
                })
                .catch(e => {
                    console.log(e)
                    done()
                })
        });

        it('should not change todo status validate status', (done) => {

            let body = {
            }

            chai.request(server)
                .put(`/tasks/1`)
                .send(body)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an('object');
                    done();
                });
        });

        it('should not change todo status must throw error', (done) => {

            let body = {
                "status": "completed"
            }

            chai.request(server)
                .put(`/tasks/12`)
                .send(body)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    done();
                });
        });

        it('change todo status', (done) => {

            let body = {
                "status": "completed"
            }

            chai.request(server)
                .put(`/tasks/1`)
                .send(body)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    done();
                });
        });

    });

    describe('Test todo sub tasks', () => {

        it('it should not create steps in specified task validate title', (done) => {

            let body = {
                "taskId": 1
            }

            chai.request(server)
                .post('/subtasks')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an('object');
                    done();
                });
        });

        it('it should not create steps in specified task and validate taskid', (done) => {

            let body = {
                "title": "step1",
            }

            chai.request(server)
                .post('/subtasks')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an('object');
                    done();
                });
        });

        it('it should create steps in specified task', (done) => {

            let body = {
                "title": "step1",
                "taskId": 1
            }

            chai.request(server)
                .post('/subtasks')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    done();
                });
        });

        it('it should not GET the sub tasks for specified task', (done) => {
            chai.request(server)
                .get('/subtasks/11111')
                .then(res => {
                    res.statusCode.should.be.eql(200)
                    res.body.should.be.a('array');
                    done()
                })
                .catch(e => {
                    done()
                })
        });

        it('it should GET all the sub tasks for specified task', (done) => {
            chai.request(server)
                .get('/subtasks/1')
                .then(res => {
                    res.statusCode.should.be.eql(200)
                    res.body.should.be.a('array');
                    done()
                })
                .catch(e => {
                    console.log(e)
                    done()
                })
        });

        it('should not change status of subtask', (done) => {

            let body = {
            }

            chai.request(server)
                .put(`/subtasks/1`)
                .send(body)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an('object');
                    done();
                });
        });

        it('should not change status of subtask through 500 error ', (done) => {

            let body = {
                "status": "completed"
            }

            chai.request(server)
                .put(`/subtasks/11111111111`)
                .send(body)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an('object');
                    done();
                });
        });

        it('change status  of specifiedto do subtask ', (done) => {

            let body = {
                "status": "completed"
            }

            chai.request(server)
                .put(`/subtasks/1`)
                .send(body)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    done();
                });
        });

        it('change status pending of specified to do subtask ', (done) => {

            let body = {
                "status": "pending"
            }

            chai.request(server)
                .put(`/subtasks/1`)
                .send(body)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    done();
                });
        });
    });
});