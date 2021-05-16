import { Request, Response, NextFunction } from "express";



class CustomMiddleware {
    public unknownEndPoint(_req: Request, _res: Response){
        _res.status(404).json({ message: "unknown endpoint" })
    }

    public errorHandler(error: any, _req: Request, _res: Response, _next: NextFunction){
        if(error.name === "CastError"){
            _res.status(400).json({ message: "malformated id" })
        }else if(error.name === "ValidationError"){
            _res.status(400).json({ message: error.message })
        } else if (error.name === "JsonWebTokenError"){
            _res.status(401).json({ message: "missing or invalid token" })
        }else {
            _res.status(500).json({ message: "an error occurred on the server " })
        }

        _next(error)
    }

}

export default new CustomMiddleware();
