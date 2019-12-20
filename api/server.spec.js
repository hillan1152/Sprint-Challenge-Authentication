const request = require('supertest');
const db = require('../database/dbConfig');

const server = require('./server.js');

describe("Server", function(){
    describe('GET /', function(){
        it("should return 200 OK", function(){
            return request(server)
                .get("/")
                .then(res => {
                    expect(res.status).toBe(200)
            })
        })
        it("should run {api: 'up'}", function(){
            return request(server)
                .get("/")
                .then(res => {
                    expect(res.body.api).toBe("up")
            })
        })
    })
})

describe("POST /Register", function() {
    describe("Adds a User", function() {
        beforeEach(async () => {
            await db('users').truncate();
        })
        it('Should return 201 OK', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send({ username: "paul", password: "blart" })
            expect(res.status).toBe(201)
        })
        it('Username works', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send({ username: "paul", password: "blart" })
            expect(res.body.username).toBe("paul")
        })
    })
})

describe("POST /Login", function(){
    describe("Grabs a user & logs in", function(){
        it('Should Return Status 200 OK', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send({ username: "paul", password: "blart" })
            expect(res.status).toBe(200);
        })
        it('Should Return Application/json', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send({ username: "paul", password: "blart" })
            expect(res.type).toBe("application/json");
        })
        it('Should Be Authenticated and Sent To Jokes', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send({ username: "paul", password: "blart" })
                .then(res => {
                    const token = res.body.token;

                    return request(server)
                        .get('/api/jokes')
                        .set("Authorization", token)
                        .then(res => {
                            expect(res.status).toBe(200);
                            expect(Array.isArray(res.body)).toBe(true);                           
                        })
                })
        })


    })
})