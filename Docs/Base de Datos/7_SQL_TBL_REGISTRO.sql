CREATE TABLE registro (
	id_registro VARCHAR(50),
	id_trabajador VARCHAR(50),
	id_area VARCHAR(50),
	id_nivel VARCHAR(50),
	id_actividad VARCHAR(50),
	PRIMARY KEY(id_registro),
	FOREIGN KEY (id_trabajador) REFERENCES trabajador(id_trabajador),
	FOREIGN KEY (id_area) REFERENCES area(id_area),
	FOREIGN KEY (id_nivel) REFERENCES nivel(id_nivel),
	FOREIGN KEY (id_actividad) REFERENCES actividad(id_actividad),
);