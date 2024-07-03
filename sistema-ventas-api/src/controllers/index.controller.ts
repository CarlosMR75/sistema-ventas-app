import { Request, Response } from "express";
import prisma from "../database/database";

class IndexController {

    public async index(req: Request, res: Response){
        try {
            const usuarios = await prisma.usuario.findMany();
            const newUser = await prisma.usuario.create({
                data: {
                  nombre: "Carlos",
                  apellidos: "Mata",
                  username: "carlos",
                  password: "linux",
                },
              })
            console.log(newUser);
            res.json({message: usuarios});
        } catch (error: any) {
            return res.status(500).json({message: `Error: ${error.message}`});
        }
    }

    public insert(req: Request, res: Response){
        try {
            res.json({message: "Insert Works"});
        } catch (error: any) {
            return res.status(500).json({message: `Error: ${error.message}`});
        }
    }

    public update(req: Request, res: Response){
        try {
            res.json({message: "UPDATE Works"});
        } catch (error: any) {
            return res.status(500).json({message: `Error: ${error.message}`});
        }
    }

    public delete(req: Request, res: Response){
        try {
            res.json({message: "DELETE Works"});
        } catch (error: any) {
            return res.status(500).json({message: `Error: ${error.message}`});
        }
    }
}

export const indexController = new IndexController();