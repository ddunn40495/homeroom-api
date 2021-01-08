// =======================================
//
//          AUTHORIZE CONTROLLER
//
// =======================================

// =========================
//       DEPENDENCIES
// =========================
const express = require("express");
const router = express.Router();
const pool = require("../models/db");
const bcrypt = require("bcrypt");
const validStudentInfo = require("../middleware/student_validation");
const validTeacherInfo = require("../middleware/teacher_validation");
const makeToken = require("../middleware/makeToken");
const authorize = require("../middleware/authorization");

//
// =======================================
//              ROUTES
// =======================================

/* =================
Register Routes
=================== */

/* Make Student Account */

router.post("/register/student", validStudentInfo, async (req, res) => {
  const {
    student_first_name,
    student_last_name,
    student_user_name,
    student_password,
    student_email,
    student_grade_level,
  } = req.body;

  try {
    const student = await pool.query(
      "SELECT * FROM students WHERE students.student_email = $1",
      [student_email]
    );

    if (student.rows.length > 0) {
      return res
        .status(401)
        .json(
          "User is already in the system please login. Ask your teacher for assitance or put in a tech support ticket if you have trouble logging in!!!"
        );
    }
    const salt = await bcrypt.genSalt(10);
    const bcrypt_student_password = await bcrypt.hash(student_password, salt);

    let newStudent = await pool.query(
      "INSERT INTO students(student_first_name, student_last_name, student_user_name, student_password, student_email, student_grade_level) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        student_first_name,
        student_last_name,
        student_user_name,
        bcrypt_student_password,
        student_email,
        student_grade_level,
      ]
    );

    const token = makeToken(newStudent.rows[0].student_id);
    console.log(newStudent.rows[0]);
    return res.json({ token });
  } catch (err) {
    if (!err) {
      console.log("200 Success");
    } else {
      console.log(err.message);
    }
    res.send("500 Error");
  }
});

/* Make Teacher Account */

router.post("/register/teacher", validTeacherInfo, async (req, res) => {
  const {
    teacher_first_name,
    teacher_last_name,
    teacher_user_name,
    teacher_password,
    teacher_email,
  } = req.body;

  try {
    const teacher = await pool.query(
      "SELECT * FROM teachers WHERE teachers.teacher_email = $1",
      [teacher_email]
    );

    if (teacher.rows.length > 0) {
      return res
        .status(401)
        .json(
          "User is already in the system please login. Ask Mr.Robinsion to how help resetting student_password or put in a tech support ticket for futher support!!!"
        );
    }
    const salt = await bcrypt.genSalt(10);
    const bcrypt_teacher_password = await bcrypt.hash(teacher_password, salt);

    let newTeacher = await pool.query(
      "INSERT INTO teachers (teacher_first_name, teacher_last_name, teacher_user_name, teacher_password, teacher_email) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        teacher_first_name,
        teacher_last_name,
        teacher_user_name,
        bcrypt_teacher_password,
        teacher_email,
      ]
    );
    console.log(newTeacher.rows[0]);
    const token = makeToken(newTeacher.rows[0].teacher_id);

    return res.json({ token });
  } catch (err) {
    console.log(err);
    res.send("500 Error");
  }
});

/* =================
Login Routes
=================== */

/* Login to Student Account */
router.post("/login/student", validStudentInfo, async (req, res) => {
  const { student_user_name, student_password } = req.body;

  try {
    const student = await pool.query(
      "SELECT * FROM students WHERE students.student_user_name = $1",
      [student_user_name]
    );

    if (student.rows.length === 0) {
      return res
        .status(401)
        .json(
          "username and/or passord is not found. Ask your teacher for assitance or put in a tech support ticket if you have trouble logging in!!!"
        );
    }

    const checkstudent_password = await bcrypt.compare(
      student_password,
      student.rows[0].student_password
    );

    if (!checkstudent_password) {
      return res
        .status(401)
        .json(
          "username and/or passord is not found. Ask your teacher for assitance or put in a tech support ticket if you have trouble logging in!!!"
        );
    }

    const token = makeToken(student.rows[0].student_id);
    return res.json({ token });
  } catch (err) {
    console.log(err);
    res.send("500 Error");
  }
});

/* Login to Teacher Account */
router.post("/login/teacher", validTeacherInfo, async (req, res) => {
  const { teacher_user_name, teacher_password } = req.body;

  try {
    const teacher = await pool.query(
      "SELECT * FROM teachers WHERE teachers.teacher_user_name = $1",
      [teacher_user_name]
    );

    if (teacher.rows.length === 0) {
      return res
        .status(401)
        .json(
          "username and/or password is not found. Please put in a tech support ticket if you have trouble logging in!!!"
        );
    }

    const checkteacher_password = await bcrypt.compare(
      teacher_password,
      teacher.rows[0].teacher_password
    );

    if (!checkteacher_password) {
      return res
        .status(401)
        .json(
          "username and/or passord is not found. Please put in a tech support ticket if you have trouble logging in!!!"
        );
    }

    const token = makeToken(teacher.rows[0].teacher_id);
    return res.json({ token });
  } catch (err) {
    console.log(err);
    res.send("500 Error");
  }
});

/* Authorization Middleware */

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
