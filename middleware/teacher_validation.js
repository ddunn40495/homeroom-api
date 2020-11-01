//=======================================
//
//         TEACHER VALIDATION MIDDLEWARE
//
// =======================================

/* This middleware checks to see if the email username and passwords are vaild when the user is making an account or login in */

module.exports = (req, res, next) => {
  const { teacher_email, teacher_user_name, teacher_password } = req.body;

  const isEmailValid = (userEmail) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  };

  const isUsernameValid = (username) => {
    if (!username) {
      return false;
    }
    return true;
  };

  if (req.path === "/register/teacher") {
    console.log(!teacher_email.length);
    if (![teacher_email, teacher_user_name, teacher_password].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!isEmailValid(teacher_email)) {
      return res.json("Invalid Email");
    }
  } else if (req.path === "/login/teacher") {
    if (![teacher_user_name, teacher_password].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!isUsernameValid(teacher_user_name)) {
      res.json("Invalid Username");
    }
  }

  next();
};
