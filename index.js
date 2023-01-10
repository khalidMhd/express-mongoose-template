const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const db = require("./config/keys");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "assets", "uploads")));

app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/file"));
app.use("/api", require("./routes/checkout"));

app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found!" });
});

app.listen(PORT, () => {
  console.log(`App leston on PORT: ${PORT}`);
});
