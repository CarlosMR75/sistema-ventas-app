import express, {Application, json} from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUI from "swagger-ui-express"

class Server{
    //TODO: Crear la instancia global de nuestra app
    public app: Application;

    // ! Generar el método constructor
    constructor() {
        this.app = express();
        this.config();
    }

    //TODO: Generar un método para la configuración
    private config(): void{
        // *  Configuración para el puerto del servidor
        this.app.set("port", process.env.PORT || 3000);

        // * Mostrar las peticiones en consola
        this.app.use(morgan("dev"))

        // * Uso de CORS (Cross Origin)
        this.app.use(cors());

        // * Generar restricciones a la API
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    // ! Generar un método para la configuración de rutas
    private routes(): void {
        throw new Error("Not Implemented");
    }

    // * Generar un método para iniciar el servicio
    start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port:", this.app.get("port"));
        });
    }
}

const server = new Server();
server.start();