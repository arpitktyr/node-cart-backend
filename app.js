const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const eventRoutes = require("./routes/events");
const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});

mongoose.connection.on("error", (err) => {
  console.log("error connecting", err);
});

app.use(authRoutes);
//app.use("/events", eventRoutes);
app.use(productsRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT); //8080
console.log(`server Started at ${PORT}`);
