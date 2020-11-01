//=======================================
//
//          AUTHORIZATION MIDDLEWARE
//
// =======================================
// =========================
//       DEPENDENCIES
// =========================
const jwt = require("jsonwebtoken");
require("dotenv").config();

// =========================
//       MIDDLEWARE
// =========================

/* This middleware is grabbing the token from the header and if the token is not there it sends back an err message, if there is a token it will proceed to verification */
module.exports = (req, res, next) => {
  const token = req.header("token");

  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  /*  Verifying the token using the user ID from the payload */
  try {
    const verify = jwt.verify(token, process.env.jwtSecret);

    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
