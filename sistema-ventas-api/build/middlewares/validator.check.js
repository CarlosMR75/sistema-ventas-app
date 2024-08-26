"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (req, res, next) => {
    console.log("Init Middleware :: Validator Check");
    // * Se obtiene los errores del request original de la peticion
    const errors = (0, express_validator_1.validationResult)(req);
    // * Si no existen errores la petición continua 
    if (errors.isEmpty())
        return next();
    // * Se devuelven los errores con una peticion
    return res.status(400).json(errors.array());
};
exports.validate = validate;
