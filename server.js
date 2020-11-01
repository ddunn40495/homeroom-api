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
const whitelist = ["http://localhost:3000", "https://homeroomclass.net"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

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
