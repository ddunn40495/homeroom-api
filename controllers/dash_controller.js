// =======================================
//
//          DASH CONTROLLER
//
// =======================================

// =========================
//       DEPENDENCIES
// =========================
const express = require("express");
const router = express.Router();
const pool = require("../models/db");
//
// =======================================
//              ROUTES
// =======================================

router.get("/student", authorize, async (req, res) => {
  try {
    const student = await pool.query(
      "SELECT student_id FROM students WHERE student_id = $1",
      [req.user.id]
    );

    res.json(student.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/teacher", authorize, async (req, res) => {
  try {
    const teacher = await pool.query(
      "SELECT teacher_id FROM teachers WHERE teacher_id = $1",
      [req.user.id]
    );

    res.json(teacher.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
