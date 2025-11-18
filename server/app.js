const express = require("express");
const passport = require("passport");
const cors = require("cors");
const router = require("./routes");
const path = require("path");
require("dotenv").config();
const session = require("express-session");
const { secret } = require("./config/auth.config");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

var corsOptions = {
  origin: true,
  method: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowheaders: ["Content-Type, Authorization"],
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
