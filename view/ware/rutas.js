import Express from "express";
import { obtenerMercancia, obtenerUnaMercancia, crearMercancia, editarMercancia, eliminarMercancia } from "../../controllers/ware/controller.js";

const rutasWare = Express.Router();

const genericCallback = (res) => (err, result) =>{
    if (err){
        res.status(400).send("error consultando")
    }else {
        res.json(result)
    }
}

rutasWare.route("/ware/").get ((req, res)=>{
    obtenerMercancia (genericCallback(res))
});

rutasWare.route("/ware/:id/").get ((req, res)=>{
    obtenerUnaMercancia (req.params.id, genericCallback(res))
});

rutasWare.route("/ware/").post ((req, res) => {
    crearMercancia (req.body, genericCallback(res))
});

rutasWare.route("/ware/:id").patch((req, res)=>{
    editarMercancia (req.params.id, req.body, genericCallback(res))
})

rutasWare.route("/ware/:id").delete((req, res) => {
    eliminarMercancia (req.params.id, genericCallback(res))
})

export default rutasWare;