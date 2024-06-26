const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  try {
    const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;
    return {
      access_token: jwt.sign(payload, JWT_SECRET, {
        expiresIn: "60m",
      }),
      refresh_token: jwt.sign(payload, JWT_REFRESH_SECRET, {
        expiresIn: "30d",
      }),
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { generateToken };
