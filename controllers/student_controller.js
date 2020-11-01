// =======================================
//
//           CONTROLLER
//
// =======================================

// =========================
//       DEPENDENCIES
// =========================
const express = require("express");
const router = express.Router();
const pool = require("../models/db");
const authorize = require("../middleware/authorization");
// =======================================
//              DATABASE
// =======================================

// =======================================
//              ROUTES
// =======================================

/* ===========
Dashboard Route
============= */
router.post("/", authorize, async (req, res) => {
  try {
    const student = await pool.query(
      "SELECT * FROM students  WHERE students.student_id = $1",
      [req.user.id]
    );
    res.json(student);
  } catch (err) {
    console.log(err);
    res.send("500 Error");
  }
});

module.exports = router;
