import Express from "express";
import { obtenerVentas, obtenerUnaVenta, crearVenta, editarVenta, eliminarVenta } from "../../controllers/beers/controller.js";

const rutasBeers = Express.Router();

const genericCallback = (res) => (err, result) =>{
    if (err){
        res.status(400).send("error consultando")
    }else {
        res.json(result)
    }
}

rutasBeers.route("/beers/").get ((req, res)=>{
    obtenerVentas (genericCallback(res))
});

rutasBeers.route("/beers/:id").get ((req, res)=>{
    obtenerUnaVenta (req.params.id, genericCallback(res))
});

rutasBeers.route("/beers/").post ((req, res) => {
    crearVenta (req.body, genericCallback(res))
});

rutasBeers.route("/beers/:id").patch((req, res)=>{
    editarVenta (req.params.id, req.body, genericCallback(res))
})

rutasBeers.route("/beers/:id").delete((req, res) => {
    eliminarVenta (req.params.id, genericCallback(res))
})

export default rutasBeers;