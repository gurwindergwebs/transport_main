const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const prisma = require("../prisma/prismaClient/prismaClient");

const verifyToken = async (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  if (!token.startsWith("Bearer ")) {
    return res.status(403).send({ message: "Invalid token format!" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(" ")[1];
    jwt.verify(token, config.secret, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      req.user = await prisma.users.findUnique({
        where: { id: req.userId },
      });
      next();
    });
  }
};

module.exports = {
  verifyToken,
};
