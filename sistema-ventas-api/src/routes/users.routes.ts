import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { validate } from "../middlewares/validator.check";
import { authRules } from "../rules/auth.rule";
import { jwtCheck } from "../middlewares/jwt.check";

class UserRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
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
    config(): void {
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
        this.router.get('/', [jwtCheck], userController.getUsers);
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
        this.router.post('/', userController.insert);
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
        this.router.put('/', userController.update);

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
        this.router.post('/delete', userController.delete);

    }
}

const userRoutes = new UserRoutes();

export default userRoutes.router;