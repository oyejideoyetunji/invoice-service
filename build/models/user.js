"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
class UserModel {
    constructor() {
        this.userSchema = this._schema();
        this.userSchema.plugin(mongoose_unique_validator_1.default);
        this.userSchema.set("toJSON", {
            transform: (_document, returnedObject) => {
                returnedObject.id = returnedObject._id.toString();
                delete returnedObject.__v;
                delete returnedObject._id;
                delete returnedObject.passwordHash;
            }
        });
        this.userModel = mongoose_1.default.model("User", this.userSchema);
    }
    _schema() {
        return new mongoose_1.default.Schema({
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            passwordHash: { type: String, required: true, minlength: 6 },
            invoices: [
                { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Invoices" }
            ]
        });
    }
}
exports.default = new UserModel().userModel;
