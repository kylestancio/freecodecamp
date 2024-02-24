const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 3000;
const BASEPATH = __dirname + "/src"

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  return res.sendFile(BASEPATH + "/index.html");
});

app.get("/script.js", (req, res) => {
  return res.sendFile(BASEPATH + "/script.js");
});

app.get("/index.css", (req, res) => {
  return res.sendFile(BASEPATH + "/index.css");
});

app.listen(PORT, (req, res) => {
  if (process.env.ENVIRONMENT !== "dev") return;
  console.log(`[server] Application is running on http://localhost:${PORT}/`);
});