import { expect, test, it, describe } from "vitest";
import supertest from "supertest";
import app from "../server.js";
import { response } from "express";

describe("Create API test", () => {
  it("User should not be create", async () => {
    const response = await supertest(app)
      .post("/api/user/create")
      .send({ name: "", email: "", phone: 123456 });
    expect(response.status).toBe(400);

    expect(response.body.message).toBe(
      "Unable to add user. Missing fields: name, email"
    );
  });
  it("User should create", async () => {
    const response = await supertest(app)
      .post("/api/user/create")
      .send({ name: "trest", email: "sssss@te.com", phone: 123456 });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(201);
    expect(response.body.message).toBe("user is created");
    expect(response.body.data).toMatchObject({
      name: "trest",
      email: "sssss@te.com",
      phone: 123456,
    });
    expect(response.body.data).toHaveProperty("id");
    expect(typeof response.body.data.id).toBe("number");
  });
});

describe("get all user API", () => {
  it("Should return array of users", async () => {
    const response = await supertest(app).get("/api/user/allusers");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.message).toBe("Users fetched");
    expect(response.body.data).toBeInstanceOf(Array);

    if (response.body.data.length > 0) {
      expect(response.body.data[0]).toMatchObject({
        name: expect.any(String),
        email: expect.any(String),
        id: expect.any(Number),
        phone: expect.any(Number),
      });
    }
  });
});

describe("GET SINGLE OBJECT BY ID", () => {
  it("get single object", async () => {
    const response = await supertest(app).get("/api/user/single/50");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(400);
    expect(response.body.message).toBe("User does not exists");
  
  });
});
