const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});
let houseAtreides = [
  { id: 1, name: "Leto Atreides" },
  { id: 2, name: "Paul Atreides" },
  { id: 3, name: "Jessica" },
  { id: 4, name: "Duncan Idaho" },
  { id: 5, name: "Gurney Halleck" },
];
server.get("/api/houses/atreides", (req, res, next) => {
  res.json(houseAtreides);
});

server.post("/api/houses/atreides", (req, res, next) => {
  if (!req.body.name) {
    next({ status: 422, message: "must include name" });
  } else {
    const created = { id: houseAtreides.length - 1, ...req.body };
    houseAtreides.push(created);
    res.status(201).json(created);
  }
});

server.delete("/api/houses/atreides/:id", (req, res, next) => {
  const houseMember = houseAtreides.filter(
    (member) => member.id == req.params.id
  );
  if (!houseMember) {
    next({
      status: 422,
      message: `house member with id: ${req.params.id} does not exist`,
    });
  } else {
    houseAtreides = houseAtreides.filter(
      (member) => member.id != req.params.id
    );
    res.status(200).json(req.params.id);
  }
});

server.use("*", (req, res, next) => {
  next({ status: 404, message: "not found" });
});

server.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
