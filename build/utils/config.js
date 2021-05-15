"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
class Config {
    constructor() {
        dotenv_1.default.config();
        this.mongodbUrl = process.env.MONGODB_URI;
        this.PORT = process.env.PORT;
    }
}
exports.default = new Config();
