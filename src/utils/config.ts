import dotenv from "dotenv";


class Config {
    public mongodbUrl: string;
    public PORT: string;

    constructor(){
        dotenv.config();
        this.mongodbUrl = process.env.MONGODB_URI as string;
        this.PORT = process.env.PORT as string;
    }
}

export default new Config();
