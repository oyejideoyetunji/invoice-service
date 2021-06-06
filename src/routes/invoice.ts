import express from "express";
import createInvoice from "../controllers/invoice/createInvoice"


class InvoiceRouter {
    public invoiceRouter: express.Router;

    constructor(){
        this.invoiceRouter = express.Router();
        this.invoiceRouter.post("/", createInvoice);
    }
}

export default new InvoiceRouter().invoiceRouter;
