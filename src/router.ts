import express from 'express';
import { UserController } from './controller/user';
const router = express.Router();

//user controller
router.use('/user',UserController);

export default router;