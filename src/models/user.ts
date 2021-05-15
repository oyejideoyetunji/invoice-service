import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";



class UserModel {
    private userSchema: mongoose.Schema<any>;
    public userModel: mongoose.Model<mongoose.Document, any>;

    constructor(){
        this.userSchema = this._schema();

        this.userSchema.plugin(uniqueValidator);
        this.userSchema.set("toJSON", {
            transform: (_document: any, returnedObject: any) => {
                returnedObject.id = returnedObject._id.toString();
                delete returnedObject.__v
                delete returnedObject._id
                delete returnedObject.passwordHash
            }
        });

        this.userModel = mongoose.model("User", this.userSchema);
    }

    private _schema(): mongoose.Schema<any>{
        return new mongoose.Schema({
            firstName:         { type: String, required: true },
            lastName:         { type: String, required: true },
            email:     { type: String, required: true, unique: true },
            passwordHash: { type: String, required: true, minlength: 6 },
            invoices:        [
                { type: mongoose.Schema.Types.ObjectId, ref: "Invoices" }
            ]
        })
    }

}

export default new UserModel().userModel;
