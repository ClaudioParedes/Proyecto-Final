CREATE TABLE trabajador (
	id_trabajador VARCHAR(50),
	id_contrato VARCHAR(50),
	rut VARCHAR(13),
	nombre VARCHAR(15),
	apellido VARCHAR(15),
    fecha_nacimiento DATE,
    cargo VARCHAR(20),
    foto VARCHAR(100),
	PRIMARY KEY(id_trabajador),
	FOREIGN KEY (id_contrato) REFERENCES contrato(id_contrato)

);