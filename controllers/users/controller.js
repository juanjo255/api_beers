import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";
import jwtDecode from "jwt-decode";

const obtenerUsuarios = async(callback)=>{
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection ("employees").find().limit(50).toArray(callback)
};

const obtenerUnUsuario = async (id, callback)=>{
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection ("employees").findOne({_id:new ObjectId(id)}, callback)
};

const consultarOCrearUsuario = async (req, callback) => {
    const token = req.headers.authorization.split ("Bearer ")[1];
    const user = jwtDecode(token)["http://localhost/userData"];
    const conexionBaseDeDatos = getDB();
    await conexionBaseDeDatos.collection ("employees").findOne ({email:user.email}, (error, response)=>{
        if (response) {
            callback (error, response)
        }else{
            user.auth0ID = user._id;
            delete user._id;
            user.rol = "Pendiente"
            crearUsuarios(user, (err, res) => {callback(err, user)});
        }
    })
};

const editarUsuario = async (id, edit, callback) =>{
    const filtro =  {_id: new ObjectId (id)}
    const operacion = {
        $set:edit,
    }
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection("employees")
    .findOneAndUpdate(filtro, operacion, {upsert: true, returnOriginal:true}, callback)
};

const crearUsuarios = async (nuevoUsuario, callback)=>{

    console.log ("nuevo Usuario creado", nuevoUsuario)
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection ("employees").insertOne(nuevoUsuario, callback)
};

export {obtenerUsuarios, obtenerUnUsuario, consultarOCrearUsuario, editarUsuario, crearUsuarios};