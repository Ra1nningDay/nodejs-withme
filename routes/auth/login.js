const express = require("express");
var router = express.router();

const login = require("../../controllers/AuthController");

route.post("/login", login);

module.exports = router;
