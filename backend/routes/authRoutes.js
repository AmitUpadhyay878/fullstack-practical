const express = require("express");
const { registerUser, verifyEmail, adminLogin } = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerUser);
router.get("/verify", verifyEmail);
router.post("/admin-login", adminLogin);

module.exports = router;