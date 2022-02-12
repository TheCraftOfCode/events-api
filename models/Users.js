const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserSchema = mongoose.Schema({
  ImageProfile: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  username: {
    type: String,
    required: true,
    minlength: 16,
    maxlength: 16,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 250,
  },
  email: {
    type: String,
    required: true,
    //can add a regex here to match
    unique: true,
  },
  phone: String,
  StartedEventNames: [String],
  RsvpEventNames: [String],
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

//method to generating a jwt token
UserSchema.methods.GenerateJwtToken = function () {
  const token = jwt.sign(
    { _id: this._id, username: this.username, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY
  );
  return token;
};
//creating a model for mongo Schema
const User = mongoose.model("User", UserSchema);

module.exports = {
  User: User,
};
