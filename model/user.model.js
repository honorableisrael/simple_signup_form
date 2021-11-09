const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");
var saltIteration = 10;


var userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: String,
});

userSchema.pre("save", function (next, doc) {
  var user = this;
  console.log(user.isNew);
  if (user.isNew || user.isModified("password")) {
    //if the user is new or modified hash algorithm runs if it is
    bcrypt.genSalt(saltIteration, function (error, salt) {
      if (error) {
        return console.log(error);
      }
      bcrypt.hash(user.password, salt, function (err, hashedPassword) {
        if (err) return next(err);
        user.password = hashedPassword;
        console.log("schema new user password" + user.password);
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(
    candidatePassword.toString(),
    this.password,
    function (error, ismatch) {
      if (error) throw error;
      return cb(null, ismatch);
    }
  );
};

const Users = mongoose.model("Users", userSchema);
module.exports = Users;