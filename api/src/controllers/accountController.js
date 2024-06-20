const express = require("express");
const accountService = require("../services/account");
const { verifyToken } = require("../auth/auth");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    return await accountService.loginService(req, res);
  } catch (err) {
    throw err;
  }
});
router.post("/signup",  async (req, res) => {
  try {
   return await accountService.signupService(req, res);
  } catch (err) {
    throw err;
  }
});


router.post("/userProfile",  async (req, res) => {
  try {
   return await accountService.GetUserProfileService(req, res);
  } catch (err) {
    throw err;
  }
});

router.post("/confirmation",  async (req, res) => {
  try {
   return await accountService.ConfirmationService(req, res);
  } catch (err) {
    throw err;
  }
});
module.exports = router;
