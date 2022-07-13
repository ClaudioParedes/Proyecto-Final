const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const db = require("../db.js");

const apiRouter = Router();

apiRouter.get("/trabajadores/:rut", async (req, res) => {
    try{
    const { rut } = req.params;
    const trabajador = await db.getTrabajadorRut(rut);
    if (!trabajador) {
        
        return res.status(404).send("Trabajador no Encontrado")
    }
    console.log(trabajador);
    res.send(trabajador);
}catch(e){
    res.status(500).send(e);
}
});

// AGREGAR TRABAJADOR
apiRouter.post("/trabajadores", async (req, res) => {
    try{
                                               
    const { id_contrato, rut, nombre, apellido, fecha_nacimiento, cargo, foto } = req.body;
    const nuevoTrabajador = await db.agregarTrabajador({ 
        id_contrato, 
        rut, 
        nombre, 
        apellido, 
        fecha_nacimiento, 
        cargo, 
        foto });

    console.log(nuevoTrabajador);
    res.status(201).send(nuevoTrabajador);
}catch(error){
    res.status(500).send(error);
}

});

// AGREGAR REGISTRO
apiRouter.post("/registros", async (req, res) => {
    try{
                                               
    // const { registro, nombre, actividad, empresa, nivel, area, contrato } = req.body;
    const nuevoRegistro = await db.agregarRegistro(req.body);

    console.log(nuevoRegistro);
    res.status(201).send(nuevoRegistro);
}catch(error){
    res.status(500).send(error);
}

});

apiRouter.post('api/login', async (req, res) => {
    try{

    }catch(error){
        res.status(500).send(error);
    }
})



module.exports = apiRouter;