import express from "express";
import login from "../controllers/login";





class LoginRouter {
    public loginRouter: express.Router;

    constructor(){
        this.loginRouter = express.Router();
        this.loginRouter.post("/", login);
    }
}

export default new LoginRouter().loginRouter;
