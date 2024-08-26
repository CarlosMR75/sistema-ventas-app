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
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                res.json({ message: 'API Works' });
            }
            catch (error) {
                return res.status(500).json({ message: `Error: ${error.message}` });
            }
        });
    }
    insert(req, res) {
        try {
            const user = req.body;
            console.log(user);
            res.json({ message: "Insert Works" });
        }
        catch (error) {
            return res.status(500).json({ message: `Error: ${error.message}` });
        }
    }
    update(req, res) {
        try {
            res.json({ message: "UPDATE Works" });
        }
        catch (error) {
            return res.status(500).json({ message: `Error: ${error.message}` });
        }
    }
    delete(req, res) {
        try {
            res.json({ message: "DELETE Works" });
        }
        catch (error) {
            return res.status(500).json({ message: `Error: ${error.message}` });
        }
    }
}
exports.indexController = new IndexController();
