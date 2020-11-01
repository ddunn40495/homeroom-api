// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const app = express();
const port = 4000;
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const pool = require("./models/db");
require("dotenv").config();

// =======================================
//      Cors
// =======================================
const cors = require("cors");

app.use(cors());
// =======================================
//      CONTROLLERS
// =======================================
const teacherController = require("./controllers/teacher_controller");
app.use("/api/teacher", teacherController);
const studentController = require("./controllers/student_controller");
app.use("/api/student", studentController);
const authController = require("./controllers/authorize_controller");
app.use("/api/auth", authController);
const openController = require("./controllers/open_routes_controller");
app.use("/api", openController);

// =======================================
//              LISTENER
// =======================================
app.listen(process.env.PORT || port, () => {
  console.log(`listening on port: ${port}`);
});
