import express from 'express';
var router = express.Router();
import userController from '../controllers/user.controller.js';
import authController from '../controllers/auth.controller.js';
import auth from '../middleware/auth.js';

// Create a new user
router.post("/signup", userController.signup);

router.post("/login", authController.login);

router.get("/profile", auth, authController.profile);

export default router;
