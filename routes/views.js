const { Router } = require('express');
const db = require("../db");
// const requireAuth = require('../middlewares/requireAuth');

const router = Router();

router.get("/", async (req, res) => {
//    const trabajador = await db.getTrabajadorRut(rut);
//    console.log(trabajador)

    res.render("index")
});

router.get("/actividad", async (req, res) => {
  
   const niveles = await db.getNiveles();
   const area = await db.getArea();
   const actividad = await db.getActividad();
   const contrato = await db.getContrato();

    res.render("actividad",{ contrato, niveles, area, actividad })
    

});

router.get("/resumen", async (req, res) => {
    const niveles = await db.getNiveles();
    const area = await db.getArea();
    const actividad = await db.getActividad();
    const contrato = await db.getContrato();
    
    res.render("resumen", { niveles, area , contrato, actividad })
});

//AGREGAR MODIFICAR ELIMINAR TRABAJADOR!
router.get("/adminTrabajador", async (req, res) => {
   
    res.render("adminTrabajadores")
});

router.get("/menuAdmin", async (req, res) => {
   
    res.render("menuAdmin")
});

router.get("/inicioSesion", async (req, res) => {
   
    res.render("inicioSesion")
});

//Listado de Trabajadores en Sección Admin.
router.get("/listaTrabajadores", async (req, res) => {
   const trabajadores = await db.getTrabajadores();
   res.render("listaTrabajadores", { trabajadores });
});

router.get("/sectActividades", async (req, res) => {
res.render("sectorActividades")
});



module.exports = router;