"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = require("../controllers/index.controller");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        /**
         * @swagger
         * /api:
         *  get:
         *      tags: [index]
         *      summary: Default index
         *      desription: Ruta por defecto de la API
         *      produces:
         *          - application/json
         *      responses:
         *          200:
         *              description: Exitoso
         */
        this.router.get('/', index_controller_1.indexController.index);
        /**
         * @swagger
         * /api:
         *  post:
         *      tags: [index]
         *      summary: Default index
         *      desription: Ruta por defecto de la API
         *      produces:
         *          - application/json
         *      responses:
         *          200:
         *              description: Exitoso
         */
        this.router.post('/', index_controller_1.indexController.insert);
        /**
         * @swagger
         * /api:
         *  put:
         *      tags: [index]
         *      summary: Default index
         *      desription: Ruta por defecto de la API
         *      produces:
         *          - application/json
         *      responses:
         *          200:
         *              description: Exitoso
         */
        this.router.put('/', index_controller_1.indexController.update);
        /**
         * @swagger
         * /api:
         *  delete:
         *      tags: [index]
         *      summary: Default index
         *      desription: Ruta por defecto de la API
         *      produces:
         *          - application/json
         *      responses:
         *          200:
         *              description: Exitoso
         */
        this.router.delete('/', index_controller_1.indexController.delete);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
