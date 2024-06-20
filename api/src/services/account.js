const {generateToken, encryptPassword, verifyToken, GetUserProfile } = require("../auth/auth");
  const accountRepo = require("../repository/accountRepo");
  
  async function loginService(req, res) {
    let response = {};
    const firstEncryption = await encryptPassword(req.body.password);
    const secondEncryption = await encryptPassword(firstEncryption);
    if (secondEncryption != null) {
      req.body.password = secondEncryption;
    }
    const result = await accountRepo.loginRepo(req, res);
    if (result != null) {
      const JwtToken = await generateToken(result);
      if (JwtToken != null) {
        response.Token = JwtToken;
      }
      res.json({ success: true, message: "Login successful", data: response });
    } else {
      res.json({
        success: true,
        message: "Email and Password combination does not match.",
      });
    }
  }
  
  async function signupService(req, res) {
    let response = {};
    const firstEncryption = await encryptPassword(req.body.password);
    const secondEncryption = await encryptPassword(firstEncryption);
    if (secondEncryption != null) {
      req.body.password = secondEncryption;
    }
    const isExist= await accountRepo.UserInfor(req,res);
    if(!isExist){
      const result = await accountRepo.signupRepo(req, res);
      if (result != null) {
        const JwtToken = await generateToken(result);
        if (JwtToken != null) {
          response.Token = JwtToken;
        }
        res.json({ success: true, message: "Registration Successfull", data: response });
    }

    } else {
      res.json({
        success: true,
        message: "User Already Exist",
        data:null
      });
    }
  }



  async function GetUserProfileService(req, res) {
    
    if (req != null) {
      const profile = await GetUserProfile(req,res);
      if (profile) {
        res.json({ success: true, message: "Registration Successfull", data: profile });
      }
     
    } else {
      res.json({
        success: true,message:"Unathorized user"
      });
    }
  }


  async function ConfirmationService(req, res) {
    
    if (req != null) {
      const profile = await accountRepo.Confirmationrepo(req,res);
      if (profile) {
        res.json({ success: true, message: "Confirmation Success", data: profile });
      }
     
    } else {
      res.json({
        success: true,message:"Unathorized user"
      });
    }
  }



  
  module.exports = {
    loginService,
    signupService,
    GetUserProfileService,
    ConfirmationService
  };
  