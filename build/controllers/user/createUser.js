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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../../models/user"));
class CreateUser {
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const passwordHash = yield bcrypt_1.default.hash(userData.password, 10);
                const user = new user_1.default({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    passwordHash,
                    invoices: userData.invoices || [],
                });
                const newUser = yield user.save();
                if (newUser) {
                    res.status(201).json(newUser);
                    console.log("User created successfully");
                }
                else {
                    res.status(500).json({
                        message: "sorry there was an error on the server"
                    });
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new CreateUser().createUser;
