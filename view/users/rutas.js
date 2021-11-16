import Express from "express";
import { obtenerUsuarios, obtenerUnUsuario, editarUsuario, consultarOCrearUsuario, crearUsuarios } from "../../controllers/users/controller.js";

const rutasUsers = Express.Router();

const genericCallback = (res) => (err, result) =>{
    if (err){
        res.status(400).send("error consultando")
        console.log("error consultando")
    }else {
        res.json(result)
    }
}

rutasUsers.route("/users/").get ((req, res)=>{
    obtenerUsuarios (genericCallback(res))
});

rutasUsers.route("/users/self").get ((req, res)=>{
    consultarOCrearUsuario (req, genericCallback (res))
});

rutasUsers.route("/users/:id/").get ((req, res)=>{
    obtenerUnUsuario (req.params.id, genericCallback(res))
});

rutasUsers.route("/users/:id/").patch((req, res)=>{
    editarUsuario (req.params.id, req.body, genericCallback(res))
})


export default rutasUsers;