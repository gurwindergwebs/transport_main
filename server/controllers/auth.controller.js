const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const { User } = require("../models");
const asyncHandler = require("../middlewares/asyncHandler");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({ message: "Invalid Password!" });
  }

  if (user.role !== "ADMIN") {
    return res.status(403).send({
      message: "You do not have permission to access this application.",
    });
  }

  const token = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 86400,
    algorithm: "HS256",
    allowInsecureKeySizes: true,
  });

  res.status(200).send({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    accessToken: token,
  });
});

const logout = asyncHandler(async (req, res) => {
  req.session = null;
  res.status(200).send({ message: "You've been logged out!" });
});

module.exports = {
  login,
  logout,
};
