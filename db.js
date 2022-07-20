const res = require("express/lib/response");
const { Pool } = require("pg");

const config = {
  user: "postgres",
  host: "localhost",
  password: "admin",
  database: "shkminning",
  port: 5432,
};

const pool = new Pool(config);



const getTrabajadorRut = async (rut) =>{
  try {
    const result = await pool.query(
      `SELECT trabajador.*, contrato.* FROM trabajador INNER JOIN contrato ON contrato.id_contrato = trabajador.id_contrato WHERE rut = '${rut}'`
    );
    return result.rows[0];
  } catch (e) {
    console.log(e);
    throw e;
  };
};
 
const editarTrabajador = async ({ id_trabajador, id_contrato, rut, nombre, apellido, fecha_nacimiento, cargo, foto }) => {
  const SQLquery = {
    text: `UPDATE trabajador SET id_contrato=$2, rut=$3, nombre=$4, apellido=$5, fecha_nacimiento=$6, cargo=$7, foto=$8 WHERE id_trabajador = $1 RETURNING *;`,
    values: [id_trabajador, id_contrato, rut, nombre, apellido, fecha_nacimiento, cargo, foto]
  };
    const result = await pool.query(SQLquery);
    const { rowCount } = result;
    if (!rowCount) throw 'No existe registro'
    return result.rows[0]
 
}


const getTrabajadorId = async (id_trabajador) =>{
  try {
    const result = await pool.query(
      `SELECT * FROM trabajador WHERE id_trabajador = '${id_trabajador}'`
    );
    return result.rows[0];
  } catch (e) {
    console.log(e);
    throw e;
  };
};


const getTrabajadores = async () => {
  const SQLquery = {
   text: `SELECT * from trabajador`,
   
};
const result = await pool.query(SQLquery);
const { rowCount } = result;
if (!rowCount) throw ('error');
return result.rows;
};


const agregarTrabajador = async ({ id_contrato, rut, nombre, apellido, fecha_nacimiento, cargo, foto }) => {
  const SQLquery = {
   text: `INSERT INTO trabajador ( id_contrato, rut, nombre, apellido, fecha_nacimiento, cargo, foto ) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
   values:[ id_contrato, rut, nombre, apellido, fecha_nacimiento, cargo, foto ]
};
const result = await pool.query(SQLquery);
const { rowCount } = result;
if (!rowCount) throw ('error');
return result.rows[0];
};

const eliminarTrabajador = async (id_trabajador) => {
  const SQLquery = {
    text: `DELETE FROM trabajador WHERE id_trabajador = $1 RETURNING *;`,
    values: [id_trabajador]
  };
  console.log(id_trabajador)
  const result = await pool.query(SQLquery);
  return result.rows[0];
};


const agregarRegistro = async ({ id_trabajador, id_area, id_nivel, id_actividad }) => {
  const SQLquery = {
   text: `INSERT INTO registro ( id_trabajador, id_area, id_nivel, id_actividad ) values ($1, $2, $3, $4) RETURNING *;`,
   values:[ id_trabajador, id_area, id_nivel, id_actividad ]
};
const result = await pool.query(SQLquery);
const { rowCount } = result;
if (!rowCount) throw ('error');
return result.rows[0];
};

//OBTENER sUsuario por CORREO
const getSuperUsuario = async (email) =>{
  try {
    const result = await pool.query(
      `SELECT * FROM admin WHERE email = '${email}'`
    );
    return  result.rows[0];
  
  } catch (e) {
    console.log(e);
    throw e;
  }
}

//AGREGAR ADMIN
async function agregarSuperUsuario (nombre, email, password){
const result = await pool.query(
  `INSERT INTO admin ( nombre, email, password) values ('${nombre}', '${email}', '${password}') RETURNING *;`,
)
const admin = result.rows[0];
return admin;
};

//********** NIVEL **********
//OBTENER NIVEL
const getNiveles = async () =>{
  try {
    const result = await pool.query(
      `SELECT * FROM nivel`
    );
    return result.rows;
  } catch (e) {
    console.log(e);
    throw e;
  };
};

//  AGREGAR NIVEL
async function agregarNivel (nombre){
  const result = await pool.query(
    `INSERT INTO nivel ( nombre ) values ('${nombre}') RETURNING *;`,
  )
  const nivel = result.rows[0];
  return nivel;
};

const eliminarNivel = async (id_nivel) => {
  const SQLquery = {
    text: `DELETE FROM nivel WHERE id_nivel = $1 RETURNING *;`,
    values: [id_nivel]
  };
  console.log(id_nivel)
  const result = await pool.query(SQLquery);
  return result.rows[0];
};

//********** AREA **********
//OBTENER AREA
const getArea = async () =>{
  try {
    const result = await pool.query(
      `SELECT * FROM area`
    );
    return result.rows;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
//AGREGAR AREA
async function agregarArea (nombre){
  const result = await pool.query(
    `INSERT INTO area ( nombre ) values ('${nombre}') RETURNING *;`,
  )
  const area = result.rows[0];
  return area;
  };

  const eliminarArea = async (id_area) => {
    const SQLquery = {
      text: `DELETE FROM area WHERE id_area = $1 RETURNING *;`,
      values: [id_area]
    };
    console.log(id_area)
    const result = await pool.query(SQLquery);
    return result.rows[0];
  };


//********** ACTIVIDAD **********
//OBTENER ACTIVIDAD
const getActividad = async () =>{
  try {
    const result = await pool.query(
      `SELECT * FROM actividad`
    );
    return result.rows;
  } catch (e) {
    console.log(e);
    throw e;
  };
};

  //AGREGAR ACTIVIDAD
  async function agregarActividad (nombre){
    const result = await pool.query(
      `INSERT INTO actividad ( nombre ) values ('${nombre}') RETURNING *;`,
    )
    const actividad = result.rows[0];
    return actividad;
    };

    const eliminarActividad = async (id_actividad) => {
      const SQLquery = {
        text: `DELETE FROM actividad WHERE id_actividad = $1 RETURNING *;`,
        values: [id_actividad]
      };
      console.log(id_actividad)
      const result = await pool.query(SQLquery);
      return result.rows[0];
    };


//---------------------------------------------------------------------------------

const getContrato = async () =>{
  try {
    const result = await pool.query(
      `SELECT * FROM contrato`
    );
    return result.rows;
  } catch (e) {
    console.log(e);
    throw e;
  }
}


module.exports = {
  getTrabajadorRut,
  getTrabajadorId,
  agregarTrabajador,
  eliminarTrabajador,
  editarTrabajador,
  getTrabajadores,
  getSuperUsuario,
  agregarSuperUsuario,
  agregarRegistro,
  getNiveles,
  agregarNivel,
  eliminarNivel,
  getArea,
  agregarArea,
  eliminarArea,
  getActividad,
  agregarActividad,
  eliminarActividad,
  getContrato
};