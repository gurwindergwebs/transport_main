const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const { User } = require("../models"); // ⬅ Sequelize model
const asyncHandler = require("../middlewares/asyncHandler");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }

  // Validate password
  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({ message: "Invalid Password!" });
  }

  // Only ADMIN can login
  if (user.role !== "ADMIN") {
    return res.status(403).send({
      message: "You do not have permission to access this application.",
    });
  }

  // Generate JWT Token
  const token = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 86400, // 24 hours
    algorithm: "HS256",
    allowInsecureKeySizes: true,
  });

  res.status(200).send({
    id: user.id,
    email: user.email,
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
