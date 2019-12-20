const request = require('supertest');

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