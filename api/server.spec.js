const request = require("supertest");
const server = require("./server");

test("is the correct env for tests", () => {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("[GET] /api/houses/atreides", () => {
  it("responds with 200 OK", async () => {
    const res = await request(server).get("/api/houses/atreides");
    //   expect(res).toEqual({}); <-- use in place of a console.log() to see what res looks like
    expect(res.status).toBe(200);
  });
  it("returns JSON", async () => {
    const res = await request(server).get("/api/houses/atreides");
    expect(res.type).toBe("application/json");
  });
  it("returns the right number of family memebers", async () => {
    let res;
    res = await request(server).get("/api/houses/atreides");
    expect(res.body).toHaveLength(5);
  });
  it("returns right format for family members", async () => {
    const res = await request(server).get("/api/houses/atreides");
    expect(res.body[0].id).toBe(1);
    expect(res.body[0].name).toBe("Leto Atreides");
  });
});

const hawat = { id: 6, name: "Thufir Hawat" };

describe("[POST] /api/houses/atreides", () => {
  it("responds with 422 if no name in payload", async () => {
    const res = await request(server)
      .post("/api/houses/atreides")
      .send({ nam: "Doctor Yueh" });
    expect(res.status).toBe(422);
  });
  it("returns 201 OK on successful POST", async () => {
    const res = await request(server).post("/api/houses/atreides").send(hawat);
    expect(res.status).toBe(201);
  });
  it("responds with newly created family memeber", async () => {
    let res;
    res = await request(server).post("/api/houses/atreides").send(hawat);
    expect(res.body).toMatchObject({ id: 5, ...hawat });
  });
});
