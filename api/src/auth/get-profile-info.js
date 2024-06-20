const config = require("../../config/api-config");
const jwt = require("jsonwebtoken");

async function getLoggedInUserId(req, res) {
	const token = req.headers["authorization"];
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
				resolve(decoded ? decoded.user_id : null);
			}
		});
	});
}
module.exports = { getLoggedInUserId };
