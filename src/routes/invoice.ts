import express from "express"
import createInvoice from "../controllers/invoice/createInvoice"
import ReadInvoice from "../controllers/invoice/readInvoice"
import UpdateInvoice from "../controllers/invoice/updateInvoice"
import DeleteInvoice from "../controllers/invoice/deleteInvoice"


class InvoiceRouter {
    public invoiceRouter: express.Router;

    constructor(){
        this.invoiceRouter = express.Router();
        this.invoiceRouter.post("/", createInvoice);
        this.invoiceRouter.get("/", ReadInvoice.readAllUserInvoices)
        this.invoiceRouter.get("/:id", ReadInvoice.readSingleInvoice)
        this.invoiceRouter.put("/:id", UpdateInvoice.updateInvoice)
        this.invoiceRouter.delete("/:id", DeleteInvoice.deleteInvoice)
    }
}

export default new InvoiceRouter().invoiceRouter;
