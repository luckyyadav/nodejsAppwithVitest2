import { expect, describe, it } from "vitest";
import supertest from "supertest";
import app from "../server.js";

describe("test apis of employee", () => {
  const createEndpoint = "/api/employee/create";
  it("test create api. It should fail", async () => {
    const res = await supertest(app).post(createEndpoint).send({
      name: "rajesh yadav2",
      skills: [],
      phone: "",
    });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(400);
    expect(res.body.message).toBe(
      "Something went wrong. Field atleast one skill should be present, phone is missing."
    );
  });

  it("should create the employee", async () => {
    const res = await supertest(app)
      .post(createEndpoint)
      .send({
        name: "rajesh yadav2",
        skills: ["html"],
        phone: 1234567,
      });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe(201);
    expect(res.body.message).toBe("employee created");
    expect(res.body.data).toMatchObject({
      name: "rajesh yadav2",
      skills: ["html"],
      phone: 1234567,
    });
    expect(res.body.data).toHaveProperty("id");
    expect(typeof res.body.data.id).toBe("number");
    expect(res.body.data.skills).toBeInstanceOf(Array);
  });
});
