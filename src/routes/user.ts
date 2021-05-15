import express from "express";
import createUser from "../controllers/user/createUser"


class UserRouter {
    public userRouter: express.Router;

    constructor(){
        this.userRouter = express.Router();
        this.userRouter.post("/", createUser);
    }
}

export default new UserRouter().userRouter;
