import Express from "express";
import { obtenerVentas, obtenerUnaVenta, crearVenta, editarVenta, eliminarVenta } from "../../controllers/sales/controller.js";

const rutasSales = Express.Router();

const genericCallback = (res) => (err, result) =>{
    if (err){
        res.status(400).send("error consultando")
    }else {
        res.json(result)
    }
}

rutasSales.route("/sales/").get ((req, res)=>{
    obtenerVentas (genericCallback(res))
});

rutasSales.route("/sales/:id/").get ((req, res)=>{
    obtenerUnaVenta (req.params.id, genericCallback(res))
});

rutasSales.route("/sales/").post ((req, res) => {
    crearVenta (req.body, genericCallback(res))
});

rutasSales.route("/sales/:id").patch((req, res)=>{
    editarVenta (req.params.id, req.body, genericCallback(res))
})

rutasSales.route("/sales/:id").delete((req, res) => {
    eliminarVenta (req.params.id, genericCallback(res))
})

export default rutasSales;