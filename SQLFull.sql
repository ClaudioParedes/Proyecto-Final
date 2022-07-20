CREATE TABLE admin (
	id_admin SERIAL,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL
 );
 DROP TABLE admin
 INSERT INTO admin(nombre, email, password) 
 VALUES ('Bruce Dickinson', 'admin@admin.cl','admin')
 
 SELECT * FROM admin

CREATE TABLE actividad (
	id_actividad SERIAL,
    nombre VARCHAR(50),
	PRIMARY KEY(id_actividad)
);

CREATE TABLE nivel (
	id_nivel SERIAL,
    nombre VARCHAR(50),
	PRIMARY KEY(id_nivel)
);

CREATE TABLE area (
	id_area SERIAL,
    nombre VARCHAR(50),
	PRIMARY KEY(id_area)
);

CREATE TABLE contrato (
	id_contrato VARCHAR(50),
    empresa VARCHAR(15),
    nro_contrato INT,
    nro_contrato_interno INT,
    fecha_ingreso DATE,
	PRIMARY KEY(id_contrato)
);
INSERT INTO contrato(id_contrato,empresa,nro_contrato,nro_contrato_interno,fecha_ingreso) VALUES
('440022514','Bormax',440022514,677-244,'02-02-2000')

CREATE TABLE trabajador (
	id_trabajador SERIAL,
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

INSERT INTO trabajador(id_contrato,rut,nombre,apellido,fecha_nacimiento,cargo,foto)
VALUES('440022514','141419439','Claudio','Paredes','01-01-1999','Ingeniero','Foto');  

CREATE TABLE registro (
	id_registro SERIAL,
	id_trabajador INT,
	id_area INT,
	id_nivel INT,
	id_actividad INT,
	PRIMARY KEY(id_registro),
	FOREIGN KEY (id_trabajador) REFERENCES trabajador(id_trabajador),
	FOREIGN KEY (id_area) REFERENCES area(id_area),
	FOREIGN KEY (id_nivel) REFERENCES nivel(id_nivel),
	FOREIGN KEY (id_actividad) REFERENCES actividad(id_actividad)
);
DROP TABLE actividad CASCADE
DROP TABLE area CASCADE
DROP TABLE nivel CASCADE
DROP TABLE trabajador CASCADE
DROP TABLE registro CASCADE
DROP TABLE contrato CASCADE

SELECT * FROM trabajador
SELECT * FROM area
SELECT * FROM nivel
SELECT * FROM actividad
SELECT * FROM registro
SELECT * FROM contrato

INSERT INTO nivel(nombre)
VALUES('Hundimiento');

INSERT INTO area(nombre)
VALUES('Esmeralda Central');

INSERT INTO actividad(nombre)
VALUES('Electrica');