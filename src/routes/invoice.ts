import express from "express";
import createInvoice from "../controllers/invoice/createInvoice"
import ReadInvoice from "../controllers/invoice/readInvoice"


class InvoiceRouter {
    public invoiceRouter: express.Router;

    constructor(){
        this.invoiceRouter = express.Router();
        this.invoiceRouter.post("/", createInvoice);
        this.invoiceRouter.get("/", ReadInvoice.readAllUserInvoices)
    }
}

export default new InvoiceRouter().invoiceRouter;
