const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 5555;
const mongoodbUrl = require("./config");
const booksRoute = require("./routes/bookRoute");
const cors = require("cors");
const app = express();

// middleware for pending requests body

app.use(express.json());

//Middleware for handling CORS  Policy

// method 1 : Allow all origins with Default of cors(*)

app.use(cors());

// method 2 : Allow Custom origins

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome");
});

app.use("/books", booksRoute);

// connecting to database
mongoose
  .connect(mongoodbUrl)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
