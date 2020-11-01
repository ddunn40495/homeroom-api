//=======================================
//
//         STUDENT VALIDATION MIDDLEWARE
//
// =======================================

/* This middleware checks to see if the email username and passwords are vaild when the user is making an account or login in */

module.exports = (req, res, next) => {
  const { student_email, student_user_name, student_password } = req.body;

  const isEmailValid = (userEmail) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  };

  const isUsernameValid = (username) => {
    if (!username) {
      return false;
    }
    return true;
  };

  if (req.path === "/register/student") {
    console.log(!student_email.length);
    if (![student_email, student_user_name, student_password].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!isEmailValid(student_email)) {
      return res.json("Invalid Email");
    }
  } else if (req.path === "/login/student") {
    if (![student_user_name, student_password].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!isUsernameValid(student_user_name)) {
      return res.json("Invalid Username");
    }
  }

  next();
};
