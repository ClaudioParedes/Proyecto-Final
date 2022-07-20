const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const db = require("../db.js");
const requireAuth = require("../middlewares/requireAuth");
const res = require("express/lib/response");

const apiRouter = Router();


//DATOS TRABAJADOR x RUT
apiRouter.get("/trabajadores/:rut", async (req, res) => {
    try{
    const { rut } = req.params;
    const trabajador = await db.getTrabajadorRut(rut);
    if (!trabajador) {
        
        return res.status(404).send("Trabajador no Encontrado")
    }
 
    res.send(trabajador);
}catch(e){
    res.status(500).send(e);
}
});
//***RUTAS ADMINISTRACION de TRABAJADOR***
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

     res.status(201).send(nuevoTrabajador);
        }catch(error){
    res.status(500).send(error);
}
});

//MODIFICAR TRABAJADOR
apiRouter.put("/trabajador/:id_trabajador", async (req, res) => {
    try {
        const { id_trabajador } = req.params;
        const { data } = req.body;
        const trabajador = await db.editarTrabajador(req.body);
      
         res.status(201).send(trabajador);
    }catch(error){
        res.status(500).send(error);
    }
});

//ELIMINAR TRABAJADOR
apiRouter.delete("/trabajador/:id_trabajador", async (req, res) => {
    try{
        const { id_trabajador } = req.params;
        const trabajador = await db.eliminarTrabajador(id_trabajador);
        res.send(trabajador);
    }catch (error){
        res.send(error).status(500);
    }
});

//DATOS TRABAJADOR x ID
apiRouter.get("/trabajador/:id", async (req, res) => {
    try{
    const { id } = req.params;
    const trabajador = await db.getTrabajadorId(id);
    if (!trabajador) {
        
        return res.status(404).send("Trabajador no Encontrado")
    }
     res.send(trabajador);
}catch(e){
    res.status(500).send(e);
}
});

//-------------------------------------------------------------------------
// *****AGREGAR ELIMINAR ACTIVIDAD y AREA******
//AGREGAR AREA
apiRouter.post("/area", async (req, res) => {
    try{
    const { nombre } = req.body;
    const agregarArea = await db.agregarArea(nombre);
    res.status(201).send(agregarArea);
}catch(error){
    res.status(500).send(error);
}
});

//ELIMINAR AREA
apiRouter.delete("/area/:id_area", async (req, res) => {
    try{
        const { id_area } = req.params;
        const area = await db.eliminarArea(id_area);
        res.send(area);
    }catch (error){
        res.send(error).status(500);
    }
});

// *****
//AGREGAR ACTIVIDAD
apiRouter.post("/actividad", async (req, res) => {
    try{
    const { nombre } = req.body;
    const agregarActividad = await db.agregarActividad(nombre);
    res.status(201).send(agregarActividad);
}catch(error){
    res.status(500).send(error);
}
});

//ELIMINAR ACTIVIDAD
apiRouter.delete("/actividad/:id_actividad", async (req, res) => {
    try{
        const { id_actividad } = req.params;
        const actividad = await db.eliminarActividad(id_actividad);
        res.send(actividad);
    }catch (error){
        res.send(error).status(500);
    }
});

// ****
//AGREGAR NIVEL
apiRouter.post("/nivel", async (req, res) => {
    try{
    const { nombre } = req.body;
    const agregarNivel = await db.agregarNivel(nombre);
    res.status(201).send(agregarNivel);
}catch(error){
    res.status(500).send(error);
}
});

//ELIMINAR NIVEL
apiRouter.delete("/nivel/:id_nivel", async (req, res) => {
    try{
        const { id_nivel } = req.params;
        const nivel = await db.eliminarNivel(id_nivel);
        res.send(nivel);
    }catch (error){
        res.send(error).status(500);
    }
});


//--------------------------------------------------------------------------------------------------


//****** ADMINISTRADOR ********
//AGREGAR ADMIN
apiRouter.post("/registro", async (req, res) => {
    const { nombre, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await db.agregarSuperUsuario(nombre, email, hashedPassword);
        res.status(201).send(admin);
      }
    );
  //----------------------------------------------------------------------------

// AGREGAR REGISTRO
apiRouter.post("/registros", async (req, res) => {
    try{
      const nuevoRegistro = await db.agregarRegistro(req.body);
      res.status(201).send(nuevoRegistro);
}catch(error){
    res.status(500).send(error);
}
});

//LOGIN USUARIO
apiRouter.post("/login", async (req, res) => {
    let { email, password } = req.body;
    let superUsuario = await db.getSuperUsuario(email);
    console.log("SUPERUSUARIO"+ JSON.stringify(superUsuario))
    console.log(superUsuario.nombre)
    if (!superUsuario) {
        return res.status(404).send({
            error: "Administrador no Existe",
            code: 404,
        });
    }

    const validPassword = await bcrypt.compare(password, superUsuario.password);
    if (validPassword === false) {
        return res.status(401).send({ error: "Credenciales inválidas", code: 401 });
    }
    const token = jwt.sign(superUsuario, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 });
    res.send({ superUsuario, token });
})

apiRouter.post("/verify", requireAuth, async (req, res) => {
    res.send(req.user);
});

module.exports = apiRouter;