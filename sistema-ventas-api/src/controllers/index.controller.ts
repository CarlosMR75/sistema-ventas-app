import { Request, Response } from "express";
import prisma from "../database/database";
import { utils } from "../utils/utils";

class IndexController {

    public async index(req: Request, res: Response){
        try {
            // const user = {
            //     cveusuario: 1,
            //     nombre: 'Carlos',
            //     rol: [1,2,3]
            // }
            // const token = utils.generateJWT(user);

            // var jwt = token;
            // var data = utils.getPayload(jwt);
            // console.log(token);
            // console.log(data);
            res.json({message: 'API Works'});
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