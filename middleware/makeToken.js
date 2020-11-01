// =======================================
//
//          MAKE TOKEN
//
// =======================================

// =========================
//       DEPENDENCIES
// =========================
const jwt = require("jsonwebtoken");
require("dotenv").config();

// =========================
//       TOKEN GENERATOR
// =========================
const jwtGenerator = (id) => {
  const payload = {
    user: {
      id: id,
    },
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "3h" });
};

module.exports = jwtGenerator;
