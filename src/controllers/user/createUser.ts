import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";
import { IUser } from "../../lib/types";
import User from "../../models/user";



class CreateUser {
    public async createUser(req: Request, res: Response, next: NextFunction){

        const userData: IUser = req.body;
        if(!userData.password || userData.password.length < 6){
            res.status(400).json({ message: "Invalid password format" });
        }else {
            try{
                const passwordHash = await bcrypt.hash(userData.password, 10);

                const user = new User({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    passwordHash,
                    invoices: userData.invoices || [],
                });

                const newUser: any = await user.save();
                if(newUser){
                    const token = jwt.sign(
                        {email: newUser.email, id: newUser.id},
                        process.env.SECRETE as string
                    )

                    const signUpResponse = {
                        token,
                        user_data: {
                            firstName: newUser.firstName,
                            lastName: newUser.lastName,
                            email: newUser.email,
                            id: newUser.id
                        }
                    }
                    res.status(201).json(signUpResponse)
                }else {
                    res.status(500).json({
                        message: "sorry there was an error on the server"
                    })
                }
            }catch(err){
                next(err)
            }
        }
    }
}

export default new CreateUser().createUser;
