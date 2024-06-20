const { hostname } = require("../config/api-config");
const { sendMailAsync } = require("../handller/nodemailler");
const userSchema = require("../schema/user");
const { v4: uuidv4 } = require("uuid");

const loginRepo = async (req, res, next) => {
  const user = await userSchema.findOne({
    email: req.body.email,
    password: req.body.password,
    varyfiedUser: true
  });
  return user;
};

// Check if user already exists
const UserInfor = async (req, res, next) => {
  const user = await userSchema.findOne({
    email: req.body.email,
  });
  return user;
};

const signupRepo = async (req, res, next) => {
  const confirmationcode = uuidv4();
  let user = new userSchema({
    userName: req.body.username,
    password: req.body.password,
    email: req.body.email.trim().toLowerCase(),
    confirmationcode: confirmationcode
  });
  const userInsert = await user.save();
  if (userInsert) {
    const link = `<h2>Welcome to Our Service</h2>
<p>Thank you for registering. Please confirm your email by clicking the link below:</p>
<a href="${hostname}/confirm?code=${confirmationcode}">Confirm Email</a>
<p>If you did not register, please ignore this email.</p>
`;
    await sendMailAsync(user.email, link);
  }
  return userInsert;
};

const Confirmationrepo = async (req, res, next) => {
  const user = await userSchema.findOneAndUpdate(
    { confirmationcode: req.body.code },
    { varyfiedUser: true },
    { new: true } // Return the updated document
  );
  return user;
};

module.exports = {
  loginRepo,
  signupRepo,
  UserInfor,
  Confirmationrepo
};
