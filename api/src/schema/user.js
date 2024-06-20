const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: {  type: String, required: true },
    confirmationcode: {type: String},
    varyfiedUser: {type: Boolean, default:false}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
