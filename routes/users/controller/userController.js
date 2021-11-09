const User = require("../model/User");

const bcrypt = require("bcryptjs");

const {
  isEmpty,
  isAlpha,
  isAlphanumeric,
  isEmail,
  isStrongPassword,
} = require("validator");

const jwt = require("jsonwebtoken");

const errorHandler = require("../../utils/errorHandler/errorHandler");
