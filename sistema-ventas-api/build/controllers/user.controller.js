"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const database_1 = __importDefault(require("../database/database"));
const utils_1 = require("../utils/utils");
class UserController {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.headers);
                const token = req.headers["auth"];
                const currentUser = utils_1.utils.getPayload(token);
                const currentUserId = currentUser === null || currentUser === void 0 ? void 0 : currentUser.cveusuario; // O el campo que identifica al usuario
                // Asegúrate de que currentUserId esté definido
                if (!currentUserId) {
                    return res.status(400).json({ message: "No se puede determinar el usuario actual" });
                }
                const usuarios = yield database_1.default.usuario.findMany({
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
            }
            catch (error) {
                return res.status(500).json({ message: `Error: ${error.message}` });
            }
        });
    }
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                console.log(user);
                // Verificar si el usuario ya existe
                const existingUser = yield database_1.default.usuario.findFirst({
                    where: { username: user.username }
                });
                if (existingUser) {
                    return res.status(400).json({ message: "User already exists" });
                }
                user.password = yield utils_1.utils.hashPassword(user.password);
                const newUser = yield database_1.default.usuario.create({ data: user });
                console.log(user);
                res.json({ message: "User inserted successfully" });
            }
            catch (error) {
                return res.status(500).json({ message: `Error: ${error.message}` });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cveusuario, nombre, apellidos, cverol } = req.body;
                if (!cveusuario) {
                    return res.status(400).json({ message: "User ID is required" });
                }
                const existingUser = yield database_1.default.usuario.findUnique({
                    where: { cveusuario }
                });
                if (!existingUser) {
                    return res.status(404).json({ message: "User not found" });
                }
                const updatedUser = yield database_1.default.usuario.update({
                    where: { cveusuario },
                    data: { nombre, apellidos, cverol }
                });
                console.log(updatedUser);
                res.json({ message: "User updated successfully", user: updatedUser });
            }
            catch (error) {
                return res.status(500).json({ message: `Error: ${error.message}` });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cveusuario } = req.body;
                console.log(cveusuario);
                if (!cveusuario) {
                    return res.status(400).json({ message: "User ID is required" });
                }
                const existingUser = yield database_1.default.usuario.findUnique({
                    where: { cveusuario }
                });
                if (!existingUser) {
                    return res.status(404).json({ message: "User not found" });
                }
                yield database_1.default.usuario.delete({
                    where: { cveusuario }
                });
                res.json({ message: "User deleted successfully" });
            }
            catch (error) {
                return res.status(500).json({ message: `Error: ${error.message}` });
            }
        });
    }
}
exports.userController = new UserController();
