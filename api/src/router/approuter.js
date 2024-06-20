const express = require("express");
const accountController = require("../controllers/accountController");

const router = express.Router();

router.use("/api/account", accountController);

module.exports = router;
