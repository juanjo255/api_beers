import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";
import jwtDecode from "jwt-decode";
import { response } from "express";

const obtenerEmpleados = async(callback)=>{
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection ("employees").find().limit(50).toArray(callback)
}

const obtenerUnEmpleado = async (id, callback)=>{
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection ("employees").findOne({_id:new ObjectId(id)}, callback)
}

const consultarOCrearEmpleado = async (req, callback) => {
    const token = req.headers.authorization.split ("Bearer ")[1];
    const user = jwtDecode(token)["http://localhost/userData"]
    const conexionBaseDeDatos = getDB();
    await conexionBaseDeDatos.collection ("usuarios").findOne ({email:user.email}, (error, response)=>{
        if (response) {

        }else{
            user.auth0ID = user._id
            delete user._id
            await crearEmpleados(user, (err, response) => callback(err, user))
        }
    })
}

const crearEmpleados = async (nuevoEmpleado, callback)=>{

    console.log ("nuevo Empleado creado", nuevoEmpleado)
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection ("employees").insertOne(nuevoEmpleado, callback)
}

const editarEmpleados = async (id, edit, callback) =>{
    const filtro =  {_id: new ObjectId (id)}
    const operacion = {
        $set:edit,
    }
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection("employees")
    .findOneAndUpdate(filtro, operacion, {upsert: true, returnOriginal:true}, callback)
}

const eliminarEmpleados = async (id, callback)=>{
    const filtro =  {_id: new ObjectId (id)}
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection("employees").deleteOne(filtro, callback)
}

export {obtenerEmpleados, obtenerUnEmpleado, consultarOCrearEmpleado, crearEmpleados, editarEmpleados, eliminarEmpleados};