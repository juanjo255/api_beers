// import tradicional
//const express = require ("express")
import Express from "express";
import Cors from "cors";
import { conectarBD } from "./db/db.js";
import rutasSales from "./view/sales/rutas.js";
import rutasUsers from "./view/users/rutas.js";
import rutasWare from "./view/ware/rutas.js";
import jwt from 'express-jwt';
import jwks from "jwks-rsa";

const app = Express()

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://cervezas-proyecto.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://api-cerverceria-autenticacion/',
    issuer: 'https://cervezas-proyecto.us.auth0.com/',
    algorithms: ['RS256']
});

app.use (Express.json());
app.use (Cors());
app.use (jwtCheck);
app.use (rutasSales);
app.use (rutasUsers);
app.use(rutasWare);

const port = process.env.PORT || 5000

const main = ()=>{
    return app.listen ( port , ()=> {console.log (`escuchando port ${ port }`)});
};

conectarBD(main);