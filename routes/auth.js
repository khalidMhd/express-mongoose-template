const express = require("express");
const {
  registerUser,
  login,
  users,
  refreshToken,
  confirmUser,
  resetPassword,
  newPassword,
  changePassord,
} = require("../controllers/auth");
const loginRequire = require("../middleware/jwt/loginRequire");
const { paginatedResults } = require("../middleware/pagination");
const { userModel } = require("../models/user");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", login);
router.post("/refresh-token", refreshToken);
router.post("/confirmation/:token", confirmUser);
router.post("/reset-password", resetPassword);
router.post("/new-password", newPassword);
router.post("/change-password", loginRequire, changePassord);
router.get("/users", paginatedResults(userModel), users);

module.exports = router;
