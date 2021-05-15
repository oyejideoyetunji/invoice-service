"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./utils/config"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./routes/user"));
class App {
    constructor() {
        this.app = express_1.default();
        this._config();
    }
    _config() {
        this._connectMongodb();
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use("/api/user", user_1.default);
        this.app.get("/", (_req, _res) => {
            _res.send("Now you'are here");
        });
        this.app.get("/home", (_req, _res) => {
            const queryName = _req.query.name;
            if (queryName && typeof queryName === "string") {
                _res.send(`The name is ${queryName}`);
            }
            else {
                _res.send("Welcome Home!!");
            }
        });
    }
    _connectMongodb() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(config_1.default.mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
                console.log("Successfully connected to mongodb");
            }
            catch (err) {
                console.error("there was an error while connecting, Error: ", err);
            }
        });
    }
}
exports.default = new App().app;
