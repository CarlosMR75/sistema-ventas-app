import { Router } from "express";
import { indexController } from "../controllers/index.controller";

class IndexRoutes {
    public router: Router;

    constructor(){
        this.router = Router();
        this.config();
    }
    config(): void {
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
        this.router.get('/', indexController.index);
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
        this.router.post('/', indexController.insert);
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
        this.router.put('/', indexController.update);
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
        this.router.delete('/', indexController.delete);
    }
}

const indexRoutes = new IndexRoutes();

export default indexRoutes.router;