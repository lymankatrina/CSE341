const routes = require("express").Router();
const names = require("../controllers/");

routes.get("/", names.displayNoName);
routes.get("/home", names.displayName);

module.exports = routes;
