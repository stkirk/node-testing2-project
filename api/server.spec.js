const request = require("supertest");

test("is the correct env for tests", () => {
  expect(process.env.DB_ENV).toBe("testing");
});
