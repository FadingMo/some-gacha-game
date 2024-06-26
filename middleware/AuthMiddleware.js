require("dotenv").config({});

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized", message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error(err);
      console.error('Error verifying token:', err);
      console.log('Token:', token);
      console.log('JWT_SECRET:', JWT_SECRET);
      return res.status(401).json({ error: "Token is invalid or expired" });
      
    }
    req.authUser = decoded;
    console.log(req.authUser)
    next();
  });
};

module.exports = { authMiddleware };
