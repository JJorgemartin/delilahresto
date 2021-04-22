const sequelize = require('./../conexion');

const Usuario = {};

Usuario.crear = async (nombre_usuario, nombre_apellido, email, direccion_envio, telefono, contrasena, esAdministrador) => {
    try{
        const result = await sequelize.query('INSERT INTO usuario (nombre_usuario, nombre_apellido, email, direccion_envio, telefono, contrasena, esAdministrador) VALUES (?,?,?,?,?,?,?)', 
        { replacements: [nombre_usuario, nombre_apellido, email, direccion_envio, telefono, contrasena, esAdministrador]
    }); 
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
};

Usuario.obtenerTodos = async () => {
    const result = await sequelize.query('SELECT id,nombre_usuario,nombre_apellido, email, direccion_envio, telefono FROM usuario', 
        { type: sequelize.QueryTypes.SELECT });
    console.log(result);
    return result;
};

Usuario.actualizar = async (id_usuario, nombre_usuario, nombre_apellido, email, direccion_envio, telefono) => {
    try{
        const result = await sequelize.query('UPDATE usuario SET nombre_usuario = ?, nombre_apellido = ?, email = ?, direccion_envio = ?, telefono = ?WHERE id = ?', {
        replacements: [nombre_usuario, nombre_apellido, email, direccion_envio, telefono,  id_usuario]
    }); 
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }   
}

Usuario.borrar = async (id) => {
    const result = await sequelize.query('DELETE FROM usuario WHERE id = ?', {replacements: [id]
    });
    return result;
}

module.exports = Usuario;