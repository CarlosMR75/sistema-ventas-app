import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validate = (req: Request, res: Response, next: NextFunction) => {
    console.log("Init Middleware :: Validator Check");
    // * Se obtiene los errores del request original de la peticion
    const errors = validationResult(req)

    // * Si no existen errores la petición continua 
    if(errors.isEmpty()) return next();

    // * Se devuelven los errores con una peticion
    return res.status(400).json(errors.array())
}
