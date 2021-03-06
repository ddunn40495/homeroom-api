// =============================
//     TEACHER  CONTROLLER
//
// =======================================

// =========================
//       DEPENDENCIES
// =========================
const express = require("express");
const router = express.Router();
const pool = require("../models/db");
const format = require("pg-format");
const authorize = require("../middleware/authorization");
// =======================================
//              DATABASE
// =======================================

// =======================================
//              ROUTES
// =======================================

router.post("/", authorize, async (req, res) => {
  try {
    const teacher = await pool.query(
      "SELECT * FROM teachers WHERE teachers.teacher_id = $1",
      [req.user.id]
    );
    res.json(teacher);
    console.log(req);
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
});

//get every student in a class
//need to add where clasue to take in param for what class
/* ===========
GET ROUTE
============= */
//STUDENTS
router.get("/students/all", async (req, res) => {
  try {
    let students = await pool.query(
      "SELECT * FROM students JOIN student_courses ON student_courses.student_id = students.student_id JOIN course_instance ON course_instance.course_instance_id = student_courses.course_instance_id JOIN courses ON courses.course_id = course_instance.course_id"
    );
    res.json(students);
  } catch (err) {
    console.log(err);
    res.send("500 Error");
  }
});
/* Get All Teachers */

//ALL TEACHERS

router.get("/all", async (req, res) => {
  try {
    let teachers = await pool.query("SELECT * FROM teachers");
    res.json(teachers);
  } catch (err) {
    console.log(err);
    res.send("500 Error");
  }
});
/* ===========
Course Routes
============= */
//CREATE NEW COURSE

router.post("/course/new", async (req, res) => {
  const { course_name, department_id } = req.body;

  try {
    let newCourse = await pool.query(
      "INSERT INTO courses (course_name, department_id) VALUES ( $1, $2) RETURNING *",
      [course_name, department_id]
    );

    console.log(newCourse);

    let allCourses = await pool.query("SELECT * FROM courses");
    res.json(allCourses);
  } catch (err) {
    console.log(err);
    res.send("500 Error");
  }
});
/* Course Instance Routes */
//CREATE NEW COURSE INSTANCE

router.post("/class/new", async (req, res) => {
  const { course_id, course_instance_period, teacher_id } = req.body;
  try {
    let courseName = await pool.query(
      "SELECT course_name FROM courses WHERE courses.course_id = $1",
      [course_id]
    );

    const course_instance_name =
      courseName.rows[0].course_name +
      "-" +
      "P" +
      "-" +
      req.body.course_instance_period +
      "-" +
      req.body.course_id;
    console.log(course_instance_name);
    let newClass = await pool.query(
      "INSERT INTO course_instance(course_id, course_instance_period, teacher_id, course_instance_name)VALUES ( $1, $2, $3, $4) RETURNING *",
      [course_id, course_instance_period, teacher_id, course_instance_name]
    );

    console.log(newClass.rows[0]);

    let classList = await pool.query("SELECT * FROM course_instance");
    res.json(classList);
  } catch (err) {
    if (err) {
      // console.log(err);
    }
    res.send("500 Error");
  }
});

//ADD STUDENTS

router.post("/students/add/:id", async (req, res) => {
  const { students } = req.body;
  try {
    let studentQuery = format(
      "INSERT INTO student_courses (student_id, course_instance_id) VALUES %L RETURNING *",
      students
    );
    console.log(students);
    let newStudents = await pool.query(studentQuery);
    console.log(studentQuery);
    /*  console.log(newStudents.rows); */

    let classRoster = await pool.query(
      " SELECT * FROM students JOIN student_courses ON student_courses.student_id = students.student_id JOIN course_instance ON course_instance.course_instance_id = student_courses.course_instance_id JOIN courses ON courses.course_id = course_instance.course_id JOIN department ON department.department_id = courses.department_id WHERE course_instance.course_instance_id = $1",
      [req.params.id]
    );
    res.json(classRoster.rows);
  } catch (err) {
    if (err) {
      // console.log(err);
    }
    res.send("500 Error");
  }
});

//DELETE Students

router.delete("/students/delete/:student/:courseInt", async (req, res) => {
  try {
    let deletedStudent = await pool.query(
      "DELETE FROM student_courses WHERE student_courses.student_id = $1 AND student_courses.course_instance_id = $2 RETURNING *",
      [req.params.student, req.params.courseInt]
    );

    console.log(deletedStudent.rows);

    let classRoster = await pool.query(
      " SELECT * FROM students JOIN student_courses ON student_courses.student_id = students.student_id JOIN course_instance ON course_instance.course_instance_id = student_courses.course_instance_id JOIN courses ON courses.course_id = course_instance.course_id JOIN department ON department.department_id = courses.department_id WHERE course_instance.course_instance_id = $1",
      [req.params.courseInt]
    );
    res.json(classRoster.rows);
  } catch (err) {
    if (err) {
      // console.log(err);
    }
    res.send("500 Error");
  }
});

/* ===========
  PUT ROUTE
  ============= */
//UPDATE
router.put("/class/:id", async (req, res) => {
  const { course_instance_period, teacher_id, course_instance_name } = req.body;
  try {
    let updatedClass = await pool.query(
      "UPDATE course_instance SET course_instance_period = $1, teacher_id = $2, course_instance_name = $3 WHERE course_instance_id = $4 RETURNING *",
      [course_instance_period, teacher_id, course_instance_name, req.params.id]
    );

    console.log(updatedClass.rows[0]);

    let classList = await pool.query("SELECT * FROM course_instance");
    res.json(classList);
  } catch (err) {
    if (err) {
      // console.log(err);
    }
    res.send("500 Error");
  }
});

/* ===========
  DELETE ROUTE
  ============= */
//DELETE

router.delete("/class/:id", async (req, res) => {
  try {
    let deletedClass = await pool.query(
      "DELETE FROM course_instance WHERE course_instance_id = $1 RETURNING *",
      [req.params.id]
    );

    console.log(deletedClass.rows[0]);

    let classList = await pool.query("SELECT * FROM course_instance");
    res.json(classList);
  } catch (err) {
    if (err) {
      // console.log(err);
    }
    res.send("500 Error");
  }
});

/* ===========
GET ROUTE
============= */
//INDEX

/* ===========
POST ROUTE
============= */
//CREATE NEW Assignment

router.post("/assignment/new", async (req, res) => {
  const { assignment_name, course_instance_id, assignment_type } = req.body;

  try {
    let assignment = await pool.query(
      "INSERT INTO assignments (assignment_name, course_instance_id, assignment_type) VALUES ( $1, $2, $3) RETURNING *",
      [assignment_name, course_instance_id, assignment_type]
    );

    console.log(assignment.rows[0]);

    let shareAssignment = await pool.query(
      "INSERT INTO assignment_instance (assignment_id, student_id)  SELECT assignments.assignment_id, students.student_id FROM students JOIN student_courses ON student_courses.student_id = students.student_id JOIN course_instance ON course_instance.course_instance_id = student_courses.course_instance_id JOIN courses ON courses.course_id = course_instance.course_id JOIN assignments ON assignments.course_instance_id = course_instance.course_instance_id WHERE assignments.assignment_id = $1 AND course_instance.course_instance_id = $2",
      [assignment.rows[0].assignment_id, assignment.rows[0].course_instance_id]
    );
    let allInstances = await pool.query(
      "SELECT * FROM assignment_instance JOIN assignments ON assignments.assignment_id = assignment_instance.assignment_id JOIN course_instance ON course_instance.course_instance_id = assignments.course_instance_id JOIN student_courses ON student_courses.course_instance_id = course_instance.course_instance_id JOIN students ON students.student_id = student_courses.student_id"
    );

    res.json(allInstances);
  } catch (err) {
    console.log(err);
    res.send("500 Error");
  }
});
router.get("/assignment/inst/all", async (req, res) => {
  const { assignment_id, student_id, kids } = req.body;

  try {
    let allInstances = await pool.query(
      "SELECT * FROM assignment_instance JOIN assignments ON assignments.assignment_id = assignment_instance.assignment_id JOIN course_instance ON course_instance.course_instance_id = assignments.course_instance_id JOIN student_courses ON student_courses.course_instance_id = course_instance.course_instance_id JOIN students ON students.student_id = student_courses.student_id"
    );

    res.json(allInstances);
  } catch (err) {
    console.log(err);
    res.send("500 Error");
  }
});
/* ===========
  PUT ROUTE
  ============= */
//UPDATE

/* ===========
  GET ROUTE
  ============= */
//EDIT

/* ===========
  DELETE ROUTE
  ============= */
//DELETE

module.exports = router;
