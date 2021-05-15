import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../../lib/types";
import User from "../../models/user";




class CreateUser {
    public async createUser(req: Request, res: Response, next: NextFunction){
        try{
            const userData: IUser = req.body;
            const passwordHash = await bcrypt.hash(userData.password, 10);

            const user = new User({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                passwordHash,
                invoices: userData.invoices || [],
            });

            const newUser = await user.save();
            if(newUser){
                res.status(201).json(newUser)
                console.log("User created successfully");
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

export default new CreateUser().createUser;
