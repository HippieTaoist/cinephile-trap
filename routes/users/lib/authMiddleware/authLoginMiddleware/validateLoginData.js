const { isEmail } = require("validator");

function validateLoginData(req, res, next) {
  const { email } = req.body;

  let errObj = {};

  if (!isEmail(email)) {
    errObj.email = "Access requires a valid email address";
  }

  if (Object.keys(errObj).length > 0) {
    return (
      res.status(500) >
      json({
        message: "Error in the Login Data",
        error: errObj,
      })
    );
  } else {
    next();
  }
}

module.exports = { validateLoginData };
