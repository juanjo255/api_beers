import { getDB } from "../../db/db.js";

const queryAllBeers = async(callback)=>{
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection ("beerSales").find().limit(50).toArray(callback)
}

const crearVenta = async (nuevaVenta, callback)=>{

    console.log ("nuevaVenta hecha", nuevaVenta)
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection ("beerSales").insertOne(nuevaVenta, callback)
}
const editarVenta = async (edit, callback) =>{
    const filtro =  {_id: new ObjectId (edit.id)}
    delete edit.id
    const operacion = {
        $set:edit,
    }
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection("beerSales")
    .findOneAndUpdate(filtro, operacion, {upsert: true, returnOriginal:true}, callback)
}

const eliminarVenta = async (del, callback)=>{
    const filtro =  {_id: new ObjectId (del.id)}
    const conexionBaseDeDatos = getDB ();
    await conexionBaseDeDatos.collection("beerSales").deleteOne(filtro, callback)
}

export {queryAllBeers, crearVenta, editarVenta, eliminarVenta};