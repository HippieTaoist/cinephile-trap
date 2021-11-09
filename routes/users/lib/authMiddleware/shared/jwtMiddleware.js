const jwt = require("jsonwebtoken");

function jwtMiddleware(req, res, next) {
  try {
    if (req.headers && req.headers.authorization) {
      let notDecodedToken = req.headers.authorization;
      let slicedToken = notDecodedToken.slice(7);
      let decodedToken = jwt.verify(slicedToken, process.env.SECRET_KEY);

      res.locals.decodedData = decodedToken;
    } else {
      throw { message: "Authorization Denied!" };
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error, Ware? Middle of jwt", error: err.message });
  }
}

module.exports = { jwtMiddleware };
