import { Request, Response, NextFunction} from "express"
import jwt, { Secret } from "jsonwebtoken"
import { IDecodedToken } from "lib/types"
import Invoice from "../../models/invoice"

class ReadInvoice {
    public async readAllUserInvoices(_req: Request, _res: Response, _next: NextFunction){
        // @ts-ignore
        const token = _req.token
        if(token){
            try {
                const decodedToken = jwt.verify(token, process.env.SECRETE as Secret) as IDecodedToken
                if(decodedToken && decodedToken.id){
                    const invoices = await Invoice.find({ user: decodedToken.id, archivedAt: null })
                    if(invoices){
                        _res.status(200).json(invoices)
                    } else {
                        _res.status(200).json({ message: "No results found" })
                    }
                } else {
                    _res.status(400).json({ message: "Invalid token" })
                }
            } catch (error) {
                _next(error)
            }
        } else {
            _res.status(400).json({ message: "missing token" })
        }
    }

    public async readSingleInvoice(_req: Request, _res: Response, _next: NextFunction){
        //@ts-ignore
        const token = _req.token
        const invoiceId = _req.params.id
        if(token){
            try {
                const decodedToken = jwt.verify(token, process.env.SECRETE as Secret) as IDecodedToken
                if(decodedToken && decodedToken.id){
                    const invoice = await Invoice.findById(invoiceId)
                    if(invoice && invoice?.user?.toString() === decodedToken.id){
                        _res.status(200).json(invoice)
                    } else {
                        _res.status(403).json({ message: "Invoice not retrieved, client might not have access to the requested invoice" })
                    }
                } else {
                    _res.status(400).json({ message: "Invalid token" })
                }
            } catch (error) {
                _next(error)
            }
        } else {
            _res.status(400).json({ message: "missing token" })
        }
    }
}

export default new ReadInvoice()
