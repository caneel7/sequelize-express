import { Response, Request } from "express";
import { badRequest, conflictResponse, serverError, okResponse, notFound, unauthorizedRequest } from "../utils/response";
import User from "../model/User";
import bcrypt from 'bcrypt';
import { Authenticator } from "../../config/authenticator";

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

const Login = async(req: Request,res:Response)=>{
    try {

        const { email, password } = req.body;

        if(!email || !password) return badRequest(res,'Please Provide Email And Password');

        const foundUser = await User.findOne({
            where:{
                email: email,
                is_active: 1
            }
        }) as User;

        if(!foundUser) return notFound(res,'Cannot Find User');

        const match = bcrypt.compare(password,foundUser.password);

        if(!match) return unauthorizedRequest(res,'Invalid Credentials');

        const token = Authenticator.generateToken(foundUser.id);

        return okResponse(res,{user:foundUser,token},'Logged In Successfully');
        
    } catch (error) {
        console.error(error);
        return serverError(res,error);
    }
}

export{
    Register,
    Login
}