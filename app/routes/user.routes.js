import express from 'express';
var router = express.Router();
import userController from '../controllers/user.controller.js';

// Create a new user
router.post("/signup", userController.signup);

export default router;
