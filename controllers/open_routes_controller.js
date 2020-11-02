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
router.get("/course/all", async (req, res) => {
  try {
    const courses = await pool.query(
      " SELECT * FROM departments JOIN courses ON courses.department_id = departments.department_id"
    );
    res.json(courses);
  } catch (err) {
    console.log(err);
    res.send("500 Error");
  }
});

router.get("/class/all", async (req, res) => {
  try {
    const classes = await pool.query(
      "SELECT * FROM departments JOIN courses ON courses.department_id = departments.department_id JOIN course_instance ON course_instance.course_id = courses.course_id"
    );
    res.json(classes);
  } catch (err) {
    console.log(err);
    res.send("500 Error");
  }
});
router.get("/class/me", async (req, res) => {
  const { teacher_id } = req.body;
  console.log(teacher_id);
  try {
    const classes = await pool.query(
      "SELECT * FROM departments JOIN courses ON courses.department_id = departments.department_id JOIN course_instance ON course_instance.course_id = courses.course_id WHERE course_instance.teacher_id = $1",
      [teacher_id]
    );
    res.json(classes);
  } catch (err) {
    console.log(err);
    res.send("500 Error");
  }
});
router.get("/department/all", async (req, res) => {
  try {
    const departments = await pool.query("SELECT * FROM departments");
    res.json(departments);
  } catch (err) {
    console.log(err);
    res.send("500 Error");
  }
});
router.get("/grades/all", async (req, res) => {
  try {
    const grades = await pool.query(
      "SELECT * FROM students JOIN student_courses ON student_courses.student_id = students.student_id JOIN course_instance ON course_instance.course_instance_id = student_courses.course_instance_id JOIN courses ON courses.course_id = course_instance.course_id JOIN assignments ON assignments.course_instance_id = course_instance.course_instance_id JOIN assignment_instance ON assignment_instance.assignment_id = assignments.assignment_id"
    );
    res.json(grades);
  } catch (err) {
    console.log(err);
    res.send("500 Error");
  }
});
module.exports = router;
