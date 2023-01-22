const userModels = require("../models/user.models");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  });
};

module.exports.signUp = async (req, res) => {
  console.log(req.body);
  const { pseudo, email, password } = req.body;

  try {
    const user = await userModels.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(500).send({ err });
  }
};

module.exports.signin = async (req, res) => {
  console.log(req.body);
  const { pseudo, password } = req.body;

  try {
    const user = await userModels.login({ pseudo, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge, HttpOnly: true });
    res.status(200).json({user:user._id})
  } catch (err) {
    res.status(500).send({ err });
  }
};

module.exports.logout = async (req, res) => {};
