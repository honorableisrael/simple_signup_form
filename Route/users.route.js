var express = require("express");
var router = express.Router();
var dbUsers = require("../model/user.model");

router.post("/user", (req, res) => {
  console.log(req.body);
  dbUsers.findOne({ email: req.body.email }, (err) => {
    console.log(err)
    if (!err) {
      const users = new dbUsers({ ...req.body });
      users
        .save()
        .then((response) => {
          res.status(201).json({
            message: "User created",
            response,
          });
        })
        .catch((err) => {
          console.log(err);
          res.json({
            message: "User creation failed",
            error: err,
          });
        })
    }
    else {
      res.status(400).json({
        message: "This email already exist",
        err
      });
    }
  });
});



module.exports = router;