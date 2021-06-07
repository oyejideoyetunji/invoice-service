import express from "express";
import cors from "cors";
import config from "./utils/config";
import mongoose from "mongoose";
import userRouter from "./routes/user";
import loginRouter from "./routes/login";
import invoiceRouter from "./routes/invoice";
import customMiddleware from "./utils/customMiddleware";


class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this._config();
    }

    private _config(){
        this._connectMongodb();

        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(customMiddleware.tokenExtractor)

        this.app.use("/api/user", userRouter);
        this.app.use("/api/login", loginRouter);
        this.app.use("/api/invoices", invoiceRouter);

        this.app.get("/", (_req, _res) => {
            _res.send("Now you'are here")
        });

        this.app.get("/home", (_req, _res) => {
            const queryName = _req.query.name;

            if(queryName && typeof queryName === "string"){
                _res.send(`The name is ${queryName}`)
            }else{
                _res.send("Welcome Home!!")
            }
        });

        this.app.use(customMiddleware.errorHandler);
        this.app.use(customMiddleware.unknownEndPoint);
    }

    private async _connectMongodb(){
        try{
            await mongoose.connect(config.mongodbUrl,
                { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }
            )

            console.log("Successfully connected to mongodb");
        }catch(err){
            console.error("there was an error while connecting, Error: ", err)
        }
    }
}

export default new App().app;
