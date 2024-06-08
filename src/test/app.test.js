import { expect, describe, it, afterAll, afterEach } from "vitest";
import supertest from "supertest";
import app from "../server";

describe("Test create api", () => {
  let res = null;
  it("If any field missing value should throw error", async () => {
    res = await supertest(app)
      .post("/api/user/create")
      .send({ name: "", email: "", phone: 1234567890 });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      "Unable to add user. Missing fields: name, email"
    );
  });

  it("should create the user", async () => {
    res = await supertest(app)
      .post("/api/user/create")
      .send({ name: "test1", email: "test1@t.com", phone: 1234567890 });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe(201);
    expect(res.body.message).toBe("user is created");
    expect(res.body.data).toHaveProperty("id");
    expect(typeof res.body.data.id).toBe("number");
    expect(res.body.data).toMatchObject({
      name: "test1",
      email: "test1@t.com",
      phone: 1234567890,
    });
    expect(res.body.data).toMatchObject({
      name: expect.any(String),
      email: expect.any(String),
      phone: expect.any(Number),
      id: expect.any(Number),
    });
  });
});

describe("should able to fetch all user", () => {
  it("return no data", async () => {
    const res = await supertest(app).get("/api/user/allusers");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Users fetched");
    expect(res.body.data).toBeInstanceOf(Array);

    if (res.body.data.length > 0) {
      expect(res.body.data[0]).toMatchObject({
        name: expect.any(String),
        email: expect.any(String),
        id: expect.any(Number),
        phone: expect.any(Number),
      });
    }
  });
});
