import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { IDecodedToken, IInvoiceInput } from "lib/types"
import User from "../../models/user"
import Invoice from "../../models/invoice"


class CreateInvoice{
    public async createInvoice(req: Request, res: Response, next: NextFunction){
        const invoiceInput: IInvoiceInput = req.body;
        // @ts-ignore
        const token = req.token;

        if(token){
            try{
                const decodedToken = jwt.verify(token, process.env.SECRETE as jwt.Secret) as IDecodedToken;
                
                if(decodedToken && decodedToken.id){
                    const user = await User.findById(decodedToken.id);
                    const invoices = await Invoice.find({ user: decodedToken.id })

                    if(user) {
                        const newInvoice = await new Invoice({
                            ...invoiceInput,
                            user: user._id,
                            invoiceNumber: `#00${invoices.length + 1}`,
                        }).save();

                        if(newInvoice){
                            user.invoices = user.invoices.concat(newInvoice._id);
                            await user.save();
                            res.status(201).json(newInvoice);
                        } else {
                            res.status(500).json({ message: "An unexpected error occurred on the server"})
                        }
                    } else {
                        res.status(400).json({ message: "user not found" })
                    }
                } else {
                    res.status(400).json({ message: "Invalid token" })
                }
            } catch(err){
                next(err)
            }
        } else {
            res.status(400).json({ message: "missing token" })
        }
    }
}

export default new CreateInvoice().createInvoice
