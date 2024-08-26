import { Request, Response } from "express";
import prisma from "../database/database";
import { utils } from "../utils/utils";

class UserController {

    public async getUsers(req: Request, res: Response) {
        try {
            console.log(req.headers);
            const token = <string>req.headers["auth"];
            const currentUser = utils.getPayload(token);
            const currentUserId = currentUser?.cveusuario; // O el campo que identifica al usuario
    
            // Asegúrate de que currentUserId esté definido
            if (!currentUserId) {
                return res.status(400).json({ message: "No se puede determinar el usuario actual" });
            }
    
            const usuarios = await prisma.usuario.findMany({
                where: {
                    NOT: {
                        cveusuario: currentUserId, // Excluye al usuario actual de los resultados
                    },
                },
                include: {
                    rol: {
                        select: {
                            cverol: true,
                            descripcion: true,
                            clave: true,
                            activo: true,
                        },
                    },
                },
            });
    
            console.log(usuarios);
            res.json(usuarios);
        } catch (error: any) {
            return res.status(500).json({ message: `Error: ${error.message}` });
        }
    }    

    public async insert(req: Request, res: Response) {
        try {
            const user = req.body;

            console.log(user)

            // Verificar si el usuario ya existe
            const existingUser = await prisma.usuario.findFirst({
                where: { username: user.username }
            });

            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            user.password = await utils.hashPassword(user.password);

            const newUser = await prisma.usuario.create({data: user})

            console.log(user);
            res.json({ message: "User inserted successfully"});
        } catch (error: any) {
            return res.status(500).json({ message: `Error: ${error.message}` });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { cveusuario, nombre, apellidos, cverol } = req.body;

            if (!cveusuario) {
                return res.status(400).json({ message: "User ID is required" });
            }

            const existingUser = await prisma.usuario.findUnique({
                where: { cveusuario }
            });

            if (!existingUser) {
                return res.status(404).json({ message: "User not found" });
            }

            const updatedUser = await prisma.usuario.update({
                where: { cveusuario },
                data: { nombre, apellidos, cverol }
            });

            console.log(updatedUser);
            res.json({ message: "User updated successfully", user: updatedUser });
        } catch (error: any) {
            return res.status(500).json({ message: `Error: ${error.message}` });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            
            const { cveusuario } = req.body;

            console.log(cveusuario)

            if (!cveusuario) {
                return res.status(400).json({ message: "User ID is required" });
            }

            const existingUser = await prisma.usuario.findUnique({
                where: { cveusuario }
            });

            if (!existingUser) {
                return res.status(404).json({ message: "User not found" });
            }

            await prisma.usuario.delete({
                where: { cveusuario }
            });

            res.json({ message: "User deleted successfully" });
        } catch (error: any) {
            return res.status(500).json({ message: `Error: ${error.message}` });
        }
    }
}

export const userController = new UserController();