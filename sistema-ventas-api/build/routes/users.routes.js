"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const jwt_check_1 = require("../middlewares/jwt.check");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    /**
     * @swagger
     * definitions:
     *  NewUser:
     *      type: object
     *      properties:
     *          nombre:
     *              type: string
     *          apellidos:
     *              type: string
     *          username:
     *              type: string
     *          password:
     *              type: string
     *          cverol:
     *              type: integer
     *  UpdateUser:
     *      type: object
     *      properties:
     *          cveusuario:
     *              type: integer
     *          nombre:
     *              type: string
     *          apellidos:
     *              type: string
     */
    config() {
        /**
         * @swagger
         * /api/users:
         *  get:
         *      tags: [user]
         *      summary: Default user
         *      desription: Ruta por defecto de la API
         *      produce:
         *          - application/json
         *      responses:
         *          200:
         *              description: Exitoso
         */
        this.router.get('/', [jwt_check_1.jwtCheck], user_controller_1.userController.getUsers);
        /**
         * @swagger
         * /api/users:
         *  post:
         *      tags: [user]
         *      summary: Default user
         *      desription: Ruta por defecto de la API
         *      produces:
         *          - application/json
         *      parameters:
         *          - in: body
         *            name: Data
         *            description: Información personal sobre el usuario.
         *            schema:
         *              $ref: '#/definitions/NewUser'
         *            required: true
         *      responses:
         *          200:
         *              description: Exitoso
         */
        this.router.post('/', user_controller_1.userController.insert);
        /**
         * @swagger
         * /api/users:
         *  put:
         *      tags: [user]
         *      summary: Update user
         *      description: Actualizar información de usuario
         *      produces:
         *          - application/json
         *      parameters:
         *          - in: body
         *            name: Data
         *            description: Información a actualizar del usuario.
         *            schema:
         *              $ref: '#/definitions/UpdateUser'
         *            required: true
         *      responses:
         *          200:
         *              description: Successfully updated
         */
        this.router.put('/', user_controller_1.userController.update);
        /**
         * @swagger
         * /api/users:
         *  delete:
         *      tags: [user]
         *      summary: Delete user
         *      description: Eliminar un usuario de la base de datos
         *      produces:
         *          - application/json
         *      parameters:
         *          - in: body
         *            name: Data
         *            description: Información para identificar el usuarios a eliminar.
         *            schema:
         *              type: object
         *              properties:
         *                cveusuario:
         *                  type: integer
         *            required: true
         *      responses:
         *          200:
         *              description: Successfully deleted
         */
        this.router.post('/delete', user_controller_1.userController.delete);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
