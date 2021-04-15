# Proyecto Dalilah Resto - Acamica

Este es el tercer proyecto del programa DWFS en Acamica

## Tareas pendientes 
- [] Crear API y sus Rutas
- [] Crear conexcion con la BD
- [] Crear archivo yaml

## Instalacion del proyecto

### Instalacion NODE modules
Realizar los siguientes pasos para inicializar en el proyecto

```bash
npm install 
```

### Instalacion de la base de datos
Correr el script para crear la BD:

```sql
CREATE DATABASE restaurante;
```

Crear la tabla usuario
```sql
CREATE TABLE usuarios(
    id INT NOT NULL PRIMARY KEY,
    nombre VARCHAR(250) NOT NULL,
);
```

### Instalacion POSTMAN
Buscar el archivo colection.json e importarlo en postman para hacer pruebas