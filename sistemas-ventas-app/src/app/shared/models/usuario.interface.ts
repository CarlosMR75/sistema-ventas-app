import { Rol } from "./rol.interface";

export interface Usuario {
    cveusuario?: number;
    nombre: String;
    apellidos: String;
    username?: String;
    password?: String;
    fecharegistro?: Date;
    cverol?: number;
    rol?: Rol;
}