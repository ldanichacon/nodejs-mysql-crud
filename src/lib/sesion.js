module.exports = {

  sesionActiva(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    else
    {
      return res.redirect('/auth/login');
    }

  },

  sesionInactiva(req,res,next){
    if(!req.isAuthenticated()){
      return next();
    }
    else
    {
      return res.redirect('/eventos');
    }

  }
};