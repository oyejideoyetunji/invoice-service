import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import User from "../../models/user";



class Login {
    public async login(_req: Request, _res: Response, _next: NextFunction){
        const userData = _req.body;
        if(userData.email && userData.password){
            try{
                const user = await User.findOne({ email: userData.email });
                const isValidUser = !!user
                    && await bcrypt.compare(userData.password, user.passwordHash);

                if(isValidUser){
                    const token = jwt.sign(
                        {email: user.email, id: user.id},
                        process.env.SECRETE as string
                    )

                    const loginResponse = {
                        token,
                        user_data: {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            id: user.id
                        }
                    }

                    _res
                        .status(200)
                        .json(loginResponse);
                }else {
                    _res
                        .status(400)
                        .json({ message: "Invalid email address and/or password." });
                }
            }catch(err){
                _next(err)
            }
        }else {
            _res
                .status(400)
                .json({
                    message: "Bad request format, email and/or password must not be empty"
                });
        }
    }
}

export default new Login().login;
