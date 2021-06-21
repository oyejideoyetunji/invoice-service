import { Request, Response, NextFunction } from "express"
import jwt, { Secret } from "jsonwebtoken"
import { IDecodedToken } from "lib/types"
import Invoice from "../../models/invoice"
import User from "../../models/user"


class DeleteInvoice {
    public async deleteInvoice(_req: Request, _res: Response, _next: NextFunction){
        //@ts-ignore
        const token = _req.token
        const invoiceId = _req.params.id

        if(token){
            try {
                const decodedToken = jwt.verify(token, process.env.SECRETE as Secret) as IDecodedToken
                if(decodedToken && decodedToken.id){
                    const user = await User.findById(decodedToken.id)
                    if(user && user.invoices.some((id: any) => id.toString() === invoiceId)){
                        await Invoice.findByIdAndDelete(invoiceId)
                        user.invoices = user.invoices.filter((id: any) => id.toString() !== invoiceId)
                        await user.save()

                        _res.status(206).json({ status: "invoice deleted successfully" })
                    } else {
                        _res.status(403).json({ message: "client has no access right to delete resource" })
                    }
                } else {
                    _res.status(401).json({ message: "Invalid token" })
                }
            } catch (error) {
                _next(error)
            }
        } else {
            _res.status(400).json({ message: "missing token" })
        }
    }
}

export default new DeleteInvoice()
