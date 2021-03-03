const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const Admin = require("../../models/Admin");

//GET api/auth
//Get admin by tokens
router.get("/:id", async (req, res) => {
  try {
    const admin = await Admin.find({ email: req.params.id }).select(
      "-password"
    );
    res.json(admin);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//POST api/auth
//Authenticate admin and get token

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res
        .status(400)
        .json({
          errors: [{ msg: "Incorrect Credentials, please try again." }],
        });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({
          errors: [{ msg: "Incorrect Credentials, please try again." }],
        });
    }

    const payload = {
      admin: {
        id: admin.id,
      },
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
