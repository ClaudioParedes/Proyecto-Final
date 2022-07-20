const { Router } = require('express');
const db = require("../db");
const jwt = require('jsonwebtoken');
const requiresAuth = require('../middlewares/requireAuth');

const router = Router();

// VISTAS PUBLICAS

router.get("/", async (req, res) => {
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

router.get("/inicioSesion", async (req, res) => {
       res.render("inicioSesion")
});


//VISTAS PRIVADAS
//AGREGAR MODIFICAR - ELIMINAR - TRABAJADOR!
router.get("/menuAdmin", async (req, res) => {
    const admin = await db.getSuperUsuario();
    res.render("menuAdmin", { requiresAuth: true })
});
//Administracion de Trabajadores
router.get("/adminTrabajador", async (req, res) => {
    const trabajadores = await db.getTrabajadores();
    res.render("adminTrabajadores", { trabajadores, requiresAuth: true })
});

//Agregar Administradores
router.get("/agregarAdmin", async (req, res) => {
      res.render("agregarAdmin", { requiresAuth: true })
});

//Listado de Trabajadores en Sección Admin.
router.get("/listaTrabajadores", async (req, res) => {
   const trabajadores = await db.getTrabajadores();
   res.render("listaTrabajadores", { trabajadores, requiresAuth: true });
});
 
//Administracion de Actividades y Sector
router.get("/sectActividades", async (req, res) => {
   const area = await db.getArea()
   const niveles = await db.getNiveles();
   const actividad = await db.getActividad();
    res.render("sectorActividades", { area, niveles, actividad, requiresAuth: true })
});




module.exports = router;