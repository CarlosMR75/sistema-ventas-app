"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_check_1 = require("../middlewares/jwt.check");
const general_controller_1 = require("../controllers/general.controller");
class GeneralRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/roles', [jwt_check_1.jwtCheck], general_controller_1.generalController.listarRoles);
    }
}
const generalRoutes = new GeneralRoutes();
exports.default = generalRoutes.router;
