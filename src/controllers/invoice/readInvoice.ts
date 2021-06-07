import { Request, Response, NextFunction} from "express"
import jwt, { Secret } from "jsonwebtoken"
import { IDecodedToken } from "lib/types"
import Invoice from "../../models/invoice"

class ReadInvoice {
    public async readAllUserInvoices(_req: Request, _res: Response, _next: NextFunction){
        // @ts-ignore
        const token = _req.token
        if(token){
            const decodedToken = jwt.verify(token, process.env.SECRETE as Secret) as IDecodedToken
            if(decodedToken && decodedToken.id){
                const invoices = await Invoice.find({ user: decodedToken.id })
                if(invoices){
                    _res.status(200).json(invoices)
                } else {
                    _res.status(200).json({ message: "No results found" })
                }
            } else {
                _res.status(400).json({ message: "Invalid token" })
            }
        } else {
            _res.status(400).json({ message: "missing token" })
        }
    }
}

export default new ReadInvoice()
