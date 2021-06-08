module.exports = (req, res, next) => {
    if(req.user.usuario.esAdministrador){
        next();
    } else {
        res.status(401).json('No esta autorizado');
    }
};


