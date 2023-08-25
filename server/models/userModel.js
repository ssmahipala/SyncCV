const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please add a name"],
    },
    lastname: {
        type: String,
        required: [true, "Please add a name"],
      },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    userType: {
      type: String,
      possibleValues: ['Recruiter, Employee'],
      required: true,
      default: 'Employee',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
