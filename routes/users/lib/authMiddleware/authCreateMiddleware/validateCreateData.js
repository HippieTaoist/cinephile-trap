const {
  isEmpty,
  isAlphanumeric,
  isAlpha,
  isEmail,
  isStrongPassword,
} = require("validator");

function validateCreateData(req, res, next) {
  const {
    firstName,
    lastName,
    username,
    email,
    password
  } = req.body;

  let errObj = {};

  if (!isAlpha(firstName)) {
    errObj.firstName =
      "You got your first name wrong... no numbers or special characters.";
  }

  if (!isAlpha(lastName)) {
    errObj.lastName =
      "You got your last name wrong... no numbers or special characters.";
  }

  if (!isAlphanumeric(username)) {
    errObj.username = "Username is alphanumberical: Numbers and Letters ONLY!";
  }

  if (!isEmail(email)) {
    errObj.email = "Email must be valid. You@EmailServer.com";
  }

  if (Object.keys(errObj).length > 0) {
    return res.json({
      message: "Error in Validating your Create Data",
      error: errObj,
    });
  } else {
    next();
  }
}

module.exports = {
  validateCreateData
};