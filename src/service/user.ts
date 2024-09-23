import { Response, Request } from "express";
import { badRequest, conflictResponse, serverError, okResponse } from "../utils/response";
import User from "../model/User";
import bcrypt from 'bcrypt';

const Register = async(req: Request,res: Response)=>{
    try {

        const { first_name, last_name, email, password } = req.body;

        if(!first_name || !last_name) return badRequest(res,'Please Provide First Name And Last Name');
        if(!email || !password) return badRequest(res,'Please Provide Email And Password');

        const duplicateUser = await User.count({
            where:{
                email: email
            }
        });

        if(duplicateUser) return conflictResponse(res,'Email Already Exists!');

        const hashPassword = await bcrypt.hash(password,13);

        const newUser :Partial<User> = {
            first_name: first_name,
            last_name: last_name, 
            email: email,
            password: hashPassword
        }

        await User.create(newUser);
        
        return okResponse(res,newUser,'Registered Successfully');
    } catch (error) {
        console.error(error);
        return serverError(res,error);
    }
}

export{
    Register
}