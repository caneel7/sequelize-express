import express from 'express';
import { Register } from '../service/user';
const _router = express.Router();

/**
 * @description user register
 */
_router.post('/register',Register)

export{
    _router as UserController
}