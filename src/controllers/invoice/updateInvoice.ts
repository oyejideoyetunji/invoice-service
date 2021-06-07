import { Request, Response, NextFunction } from "express"
import jwt, { Secret } from "jsonwebtoken"
import { IDecodedToken } from "lib/types"
import Invoice from "../../models/invoice"


class UpdateInvoice {
    public async updateInvoice(_req: Request, _res: Response, _next: NextFunction){
        //@ts-ignore
        const token = _req.token
        const invoiceId = _req.params.id
        const updateData = _req.body

        if(token){
            try {
                const decodedToken = jwt.verify(token, process.env.SECRETE as Secret) as IDecodedToken
                if(decodedToken && decodedToken.id){
                    const invoiceToUpdate = await Invoice.findById(invoiceId)
                    if(invoiceToUpdate){
                        if(invoiceToUpdate?.user?.toString() === decodedToken.id){
                            const updatedInvoice = await Invoice.findByIdAndUpdate(
                                invoiceId,
                                updateData,
                                { new: true, runValidators: true, context: "query" }
                            )
                            _res.status(202).json(updatedInvoice)
                        } else {
                            _res.status(403).json({ message: "client has no access right to update invoice" })
                        }
                    } else {
                        _res.status(500).json({ message: "resource not found"})
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

export default new UpdateInvoice()
