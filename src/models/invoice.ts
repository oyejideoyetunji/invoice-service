import { IInvoiceStatus } from "../lib/types";
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

class InvoiceModel {
  private invoiceSchema: mongoose.Schema<any>;
  public invoiceModel: mongoose.Model<mongoose.Document, any>;

  constructor() {
    this.invoiceSchema = this._schema();
    this.invoiceSchema.plugin(uniqueValidator);
    this.invoiceSchema.set("toJSON", {
      transform: (_document: any, returnedObject: any) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject.__v;
        delete returnedObject._id;
        delete returnedObject.passwordHash;
      },
    });

    this.invoiceModel = mongoose.model("Invoice", this.invoiceSchema);
  }

  private _schema(): mongoose.Schema<any> {
    return new mongoose.Schema({
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      invoiceNumber: { type: String, required: true, unique: true },
      marchantStreet: { type: String, required: true },
      marchantCity: { type: String, required: true },
      marchantPostCode: { type: String, required: true },
      marchantCountry: { type: String, required: true },
      clientName: { type: String, required: true },
      clientEmail: { type: String, required: true },
      clientStreet: { type: String, required: true },
      clientCity: { type: String, required: true },
      clientPostCode: { type: String, required: true },
      clientCountry: { type: String, required: true },
      invoiceDate: { type: Date, required: true },
      paymentTerms: { type: Date, required: true },
      transactionDescription: { type: String, required: true },
      totalAmount: { type: Number, required: true},
      status: { type: String, enum: Object.values(IInvoiceStatus), required: true },
      itemList: {
        type: [
          {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            total: { type: Number, required: true },
          },
        ],
        required: true,
      },
    });
  }
}

export default new InvoiceModel().invoiceModel;
