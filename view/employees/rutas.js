import Express from "express";
import { obtenerEmpleados, obtenerUnEmpleado, crearEmpleados, editarEmpleados, eliminarEmpleados, consultarOCrearEmpleado } from "../../controllers/employees/controller.js";

const rutasEmployees = Express.Router();

const genericCallback = (res) => (err, result) =>{
    if (err){
        res.status(400).send("error consultando")
    }else {
        res.json(result)
    }
}

rutasEmployees.route("/employees").get ((req, res)=>{
    obtenerEmpleados (genericCallback(res))
});

rutasEmployees.route("/employees/self").get ((req, res)=>{
    consultarOCrearEmpleado (req, genericCallback (res))
});

rutasEmployees.route("/employees/:id").get ((req, res)=>{
    obtenerUnEmpleado (req.params.id, genericCallback(res))
});

rutasEmployees.route("/employees").post ((req, res) => {
    crearEmpleados (req.body, genericCallback(res))
});

rutasEmployees.route("/employees/:id").patch((req, res)=>{
    editarEmpleados (req.params.id, req.body, genericCallback(res))
})

rutasEmployees.route("/employees/:id").delete((req, res) => {
    eliminarEmpleados (req.params.id, genericCallback(res))
})

export default rutasEmployees;