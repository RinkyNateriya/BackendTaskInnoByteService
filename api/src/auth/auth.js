const jwt = require("jsonwebtoken");
const config = require("../config/api-config");
const crypto = require("crypto");

async function generateToken(userData) {
  const payload = {
    user_id: userData._id.toString(),
    email: userData.email,
    username: userData.userName,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  };
  const api_access_token = jwt.sign(payload, config.api_secret_key);
  return api_access_token;
}

async function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "No token provided" });
  }
  jwt.verify(token, config.api_secret_key, (err, decoded) => {
    if (err) {
      return res
        .status(200)
        .json({ success: false, message: "Failed to authenticate token" });
    }
    if (req.isCallApi) {
      res.status(200).json({ success: true, message: "verify Token success" });
    }
    next();
  });
}

function encryptPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function GetUserProfile(req, res) {
	const token = req.headers["authorization"] || req.headers["x-access-token"];
	if (!token) {
		res.status(401).json({ success: false, message: "No token provided" });
		return null;
	}

	return new Promise((resolve, reject) => {
		jwt.verify(token, config.api_secret_key, (err, decoded) => {
			if (err) {
				res
					.status(401)
					.json({ success: false, message: "Failed to authenticate token" });
				//  resolve(null);
			} else {
				resolve(decoded ? decoded: null);
			}
		});
	});
}

module.exports = { generateToken, verifyToken, encryptPassword ,GetUserProfile};
