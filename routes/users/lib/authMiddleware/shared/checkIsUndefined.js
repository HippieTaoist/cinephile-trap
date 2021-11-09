const undefined = "";

function checkIsUndefined(req, res, next) {
  if (Object.keys(req.body).length === 0 || req.body === undefined) {
    return res.status(500).json({
      message: "I Checked and is undefined.",
      error: "Please fill out the form with validity",
    });
  } else {
    next();
  }
}

module.exports = { checkIsUndefined };
