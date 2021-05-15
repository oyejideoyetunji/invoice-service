"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
const PORT = 8080;
app.get("/", (_req, _res) => {
    _res.send("Now you'are here");
});
app.get("/home", (_req, _res) => {
    const queryName = _req.query.name;
    if (queryName && typeof queryName === "string") {
        _res.send(`The name is ${queryName}`);
    }
    else {
        _res.send("Welcome Home!!");
    }
});
app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});
