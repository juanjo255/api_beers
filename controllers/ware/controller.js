import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";

const obtenerMercancia = async(callback)=>{
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection ("ware").find().limit(50).toArray(callback)
}

const obtenerUnaMercancia = async (id, callback)=>{
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection ("ware").findOne({_id:new ObjectId(id)}, callback)
}

const crearMercancia = async (nuevaMercancia, callback)=>{

    console.log ("nuevaMercancia hecha", nuevaMercancia)
    nuevaMercancia.estado = "Disponible"
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection ("ware").insertOne(nuevaMercancia, callback)
}

const editarMercancia = async (id, edit, callback) =>{
    const filtro =  {_id: new ObjectId (id)}
    const operacion = {
        $set:edit,
    }
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection("ware")
    .findOneAndUpdate(filtro, operacion, {upsert: true, returnOriginal:true}, callback)
}

const eliminarMercancia = async (id, callback)=>{
    const filtro =  {_id: new ObjectId (id)}
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection("ware").deleteOne(filtro, callback)
}

export {obtenerMercancia, obtenerUnaMercancia, crearMercancia, editarMercancia, eliminarMercancia};