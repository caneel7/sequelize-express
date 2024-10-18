import express from 'express';
import { Login, Register } from '../service/user';
import { okResponse } from '../utils/response';
const _router = express.Router();

/**
 * @description user register
 */
_router.post('/register',Register)


/**
 * @description user login
 */
_router.post('/login',Login);

/**
 * @description return ping
 */
_router.get('/ping',(req,res)=>{
    return okResponse(res,'ping','Ping');
})

export{
    _router as UserController
}