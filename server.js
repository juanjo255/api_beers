// import tradicional
//const express = require ("express")
import Express from "express";
import Cors from "cors";
import { conectarBD } from "./db/db.js";
import rutasBeers from "./view/beers/rutas.js";
import rutasEmployees from "./view/employees/rutas.js";

const app = Express() 

app.use (Express.json());
app.use (Cors());
app.use (rutasBeers);
app.use (rutasEmployees);

//const port = process.env.PORT || 5000

const main = ()=>{
    return app.listen ( process.env.PORT , ()=> {console.log (`escuchando port ${ process.env.PORT }`)});
};

conectarBD(main);