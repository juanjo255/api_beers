import Express from "express";
import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";
import { queryAllBeers, crearVenta, editarVenta, eliminarVenta } from "../../controllers/beers/controller.js";

const rutasBeers = Express.Router();

const genericCallback = (err, result) =>{
    if (err){
        res.status(400).send("error consultando")
    }else {
        res.json(result)
    }
}

rutasBeers.route("/beers").get ((req, res)=>{
    queryAllBeers (genericCallback(res))
});

rutasBeers.route("/beers/post").post ((req, res) => {

    crearVenta (req.body, generiCallback(res))
});

rutasBeers.route("/beers/edit").patch((req, res)=>{
    editarVenta (req.body, genericCallback(res))
})

rutasBeers.route("/beers/delete").delete((req, res) => {
    eliminarVenta (req.body, genericCallback(res))
})

export default rutasBeers;