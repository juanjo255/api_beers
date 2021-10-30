import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";

const obtenerVentas = async(callback)=>{
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection ("beerSales").find().limit(50).toArray(callback)
}

const obtenerUnaVenta = async (id, callback)=>{
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection ("beerSales").findOne({_id:new ObjectId(id)}, callback)
}

const crearVenta = async (nuevaVenta, callback)=>{

    console.log ("nuevaVenta hecha", nuevaVenta)
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection ("beerSales").insertOne(nuevaVenta, callback)
}
const editarVenta = async (id, edit, callback) =>{
    const filtro =  {_id: new ObjectId (id)}
    const operacion = {
        $set:edit,
    }
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection("beerSales")
    .findOneAndUpdate(filtro, operacion, {upsert: true, returnOriginal:true}, callback)
}

const eliminarVenta = async (id, callback)=>{
    const filtro =  {_id: new ObjectId (id)}
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection("beerSales").deleteOne(filtro, callback)
}

export {obtenerVentas, obtenerUnaVenta, crearVenta, editarVenta, eliminarVenta};