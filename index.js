const config = require("config");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const debug = require("debug")("app:startup");

const home = require("./routes/home");
const courses = require("./routes/courses");
const logger = require("./middleware/logger");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);

console.log("Name: " + config.get("name"));
console.log("Host: " + config.get("email.host"));
// console.log("Password: " + config.get("email.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan Enabled");
}

app.use(logger);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening in port ${port}...`));
