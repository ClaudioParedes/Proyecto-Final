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
      `SELECT trabajador.*, contrato.empresa FROM trabajador INNER JOIN contrato ON contrato.id_contrato = trabajador.id_contrato WHERE rut = '${rut}'`
    );
    return result.rows[0];
  } catch (e) {
    console.log(e);
    throw e;
  }
}

const getTrabajadores = async () => {
  const SQLquery = {
   text: `SELECT * from trabajador`,
   
};
const result = await pool.query(SQLquery);
const { rowCount } = result;
if (!rowCount) throw ('error');
return result.rows;
};


const agregarTrabajador = async ({ id_contrato, rut, nombre, apellido, fecha_nacicimiento, cargo, foto }) => {
  const SQLquery = {
   text: `INSERT INTO trabajador ( id_contrato, rut, nombre, apellido, fecha_nacimiento, cargo, foto ) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
   values:[ id_contrato, rut, nombre, apellido, fecha_nacicimiento, cargo, foto ]
};
const result = await pool.query(SQLquery);
const { rowCount } = result;
if (!rowCount) throw ('error');
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

const getNiveles = async () =>{
  try {
    const result = await pool.query(
      `SELECT * FROM nivel`
    );
    return result.rows;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

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
}

const getActividad = async () =>{
  try {
    const result = await pool.query(
      `SELECT * FROM actividad`
    );
    return result.rows;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

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
  getTrabajadores,
  agregarTrabajador,
  agregarRegistro,
  getNiveles,
  getArea,
  getActividad,
  getContrato,
};