const request = require("supertest");
let app = require("./index.js").app;

describe("API tests", () => {
    describe("GET tests", () => {
        it("should return todos list", (done) => {
            request(app).get("/todos").expect(200, done);
        });
        it("should return todo with the specified id", (done) => {
            request(app).get("/todos/1").expect(200, done);
        });
    });
    describe("POST tests", () => {
        it("should add a new todo and return an updated array of todos", (done) => {
            request(app)
                .post("/todos")
                .send({ text: "New Todo", completed: false })
                .expect(200, done);
        });
    });
    describe("PUT tests", () => {
        it("should update an existing todo and return the updated array of todos", (done) => {
            request(app)
                .put("/todos")
                .send({ id: 1, text: "Updated Todo", completed: "true" })
                .expect(200, done);
        });
    });
    describe("DELETE tests", () => {
        it("should delete the todo with the specified id and return the updated array of todos", (done) => {
            request(app).delete("/todos/1").expect(200, done);
        });
    });
});
