import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({path: "./.env"});

const stringDeConexion = process.env.DATABASE_URL;
const Client  = new MongoClient (stringDeConexion, {useNewUrlParser:true, useUnifiedTopology:true})

let conexionBaseDeDatos;

const conectarBD = (callback) => {
    Client.connect((err,db) =>{
        if (err){
            console.error("error conectando a la base de datos");
            return false;
        }
        conexionBaseDeDatos = db.db("beers");
        console.log("conexion exitosa")
        return callback();
    });
};
const getDB = ()=>{
    return conexionBaseDeDatos;
}
export { conectarBD, getDB };