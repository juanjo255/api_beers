// import tradicional
//const express = require ("express")
import Express from "express";
import { ObjectId } from "mongodb";
import Cors from "cors";
import { conectarBD, getDB } from "./db/db.js";

const app = Express() 


app.use (Express.json());
app.use (Cors())

app.get ("/beers", (req, res)=>{
    const conexionBaseDeDatos = getDB ();
    conexionBaseDeDatos.collection ("beerSales").find().limit(50).toArray((err, result)=>{
        if (err){
            res.status(400).send("error consultando")
        }else {
            res.json(result)
        }
    })
});

app.post ("/beers/post", (req, res) => {
    const nuevaVenta = req.body
    console.log ("nuevaVenta hecha", nuevaVenta)
    const conexionBaseDeDatos = getDB ();
    conexionBaseDeDatos.collection ("beerSales").insertOne(nuevaVenta, (err,result)=>{
        if (err){
            console.error(err)
            res.sendStatus(500)
        }else {
            res.sendStatus(200)
        }
    })
});

app.patch ("/beers/edit", (req, res)=>{

    const edit = req.body;
    const filtro =  {_id: new ObjectId (edit.id)}
    delete edit.id
    const operacion = {
        $set:edit,
    }
    const conexionBaseDeDatos = getDB ();
    conexionBaseDeDatos.collection("beerSales").findOneAndUpdate(filtro, operacion, {upsert: true, returnOriginal:true}, (err,result)=>{
        if (err){
            console.error ("error actualizando la venta")
            res.sendStatus (500)
        }else{
            console.log ("actualizado con exito")
            res.sendStatus(200)
        }
    })
})

app.delete ("/beers/delete", (req, res) => {
    const del = req.body;
    const filtro =  {_id: new ObjectId (del.id)}
    const conexionBaseDeDatos = getDB ();
    conexionBaseDeDatos.collection("beerSales").deleteOne(filtro, (err,result)=>{
        if (err){
            console.error ("error actualizando la venta")
            res.sendStatus (500)
        }else{
            console.log ("actualizado con exito")
            res.sendStatus(200)
        }
    })
})



const main = ()=>{
    return app.listen (process.env.PORT, ()=> {console.log (`escuchando port ${process.env.PORT}`)});
};

conectarBD(main);