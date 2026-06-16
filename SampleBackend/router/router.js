import express from 'express';
import { login, signup, updateProfile } from '../controllers/userController.js';

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.put("/profile/:id", updateProfile);

export default router;