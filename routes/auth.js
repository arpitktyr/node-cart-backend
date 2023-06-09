const express = require("express");
const { add, get } = require("../data/user");
const { createJSONToken, isValidPassword, checkAuth } = require("../util/auth");
const { isValidEmail, isValidText } = require("../util/validation");
const User = require("../models/user.model");
const { v4: generateId } = require("uuid");
const { hash } = require("bcryptjs");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const data = req.body;
  let errors = {};

  if (!isValidEmail(data.email)) {
    errors.email = "Invalid email.";
  } else {
    try {
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser) {
        errors.email = "Email exists already.";
      }
    } catch (error) {
      next(error);
    }
  }

  if (!isValidText(data.password, 6)) {
    errors.password = "Invalid password. Must be at least 6 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "User signup failed due to validation errors.",
      errors,
    });
  }
  try {
    const hashedPw = await hash(data.password, 12);
    const createdUser = await User.create({
      ...data,
      password: hashedPw,
      id: generateId(),
    });
    const authToken = createJSONToken(createdUser.email);
    res
      .status(201)
      .json({ message: "User created.", user: createdUser, token: authToken });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let user;
  try {
    user = await User.findOne({ email: email });

    if (!user) {
      return res.status(422).json({
        message: "Invalid credentials.",
        errors: { credentials: "Invalid email or password entered." },
      });
    }
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed." });
  }

  const pwIsValid = await isValidPassword(password, user.password);
  if (!pwIsValid) {
    return res.status(422).json({
      message: "Invalid credentials.",
      errors: { credentials: "Invalid email or password entered." },
    });
  }

  const token = createJSONToken(email);

  res.json({ token, id: user.id, email: user.email, name: user.name });
});

//router.use(checkAuth);

router.post("/updateUser", checkAuth, async (req, res, next) => {
  const { name, address, id } = req.body;
  let errors = {};

  try {
    //update User Data
    const data = await User.findOneAndUpdate(
      { id },
      {
        name,
        address,
      }
    );
    if (data) {
      return res.status(200).json({
        message: "User data updated.",
      });
    } else {
      return res.status(500).json({
        message: "Something Went Wrong!.",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
