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
    console.log(user.email)
    const conexionBaseDeDatos = getDB();
    await conexionBaseDeDatos.collection ("employees").findOne ({email:user.email}, (error, response)=>{
        if (response) {
            console.log (response)
        }else{
            user.auth0ID = user._id;
            delete user._id;
            user.rol = "pendiente"
            crearUsuarios(user, (err, response) => {callback(err, user)});
        }
    })
};

const crearUsuarios = async (nuevoUsuario, callback)=>{

    console.log ("nuevo Usuario creado", nuevoUsuario)
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection ("employees").insertOne(nuevoUsuario, callback)
};

const editarUsuarios = async (id, edit, callback) =>{
    const filtro =  {_id: new ObjectId (id)}
    const operacion = {
        $set:edit,
    }
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection("employees")
    .findOneAndUpdate(filtro, operacion, {upsert: true, returnOriginal:true}, callback)
};

const eliminarUsuarios = async (id, callback)=>{
    const filtro =  {_id: new ObjectId (id)}
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection("employees").deleteOne(filtro, callback)
};

export {obtenerUsuarios, obtenerUnUsuario, consultarOCrearUsuario, crearUsuarios, editarUsuarios, eliminarUsuarios};