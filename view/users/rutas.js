import Express from "express";
import { obtenerUsuarios, obtenerUnUsuario, crearUsuarios, editarUsuario, eliminarUsuarios, consultarOCrearUsuario } from "../../controllers/users/controller.js";

const rutasUsers = Express.Router();

const genericCallback = (res) => (err, result) =>{
    if (err){
        res.status(400).send("error consultando")
        console.log("error consultando")
    }else {
        res.json(result)
    }
}

rutasUsers.route("/users").get ((req, res)=>{
    obtenerUsuarios (genericCallback(res))
});

rutasUsers.route("/users/self").get ((req, res)=>{
    consultarOCrearUsuario (req, genericCallback (res))
});

rutasUsers.route("/users/:id/").get ((req, res)=>{
    obtenerUnUsuario (req.params.id, genericCallback(res))
});

rutasUsers.route("/users").post ((req, res) => {
    crearUsuarios (req.body, genericCallback(res))
});

rutasUsers.route("/users/:id/").patch((req, res)=>{
    console.log("entro aqui con", req.params.id, req.body);
    editarUsuario (req.params.id, req.body, genericCallback(res))
})

rutasUsers.route("/users/:id/").delete((req, res) => {
    eliminarUsuarios (req.params.id, genericCallback(res))
})

export default rutasUsers;