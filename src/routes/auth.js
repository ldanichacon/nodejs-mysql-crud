const express = require('express');
const router = express.Router();
const passport = require('passport');
const {sesionActiva, sesionInactiva} = require('../lib/sesion');

router.get('/signup' , sesionInactiva,(req , res) => {
  res.render('auth/signup');
});

router.post('/signup' , sesionInactiva, passport.authenticate('local.signup',{
  successRedirect: '/eventos',
  failureRedirect: '/'
}));
module.exports = router;

router.get('/login' , sesionInactiva, (req , res, next) => {
  res.render('auth/login');
});

router.post('/login' , sesionInactiva, (req,res,next) =>{
  passport.authenticate('local.login',{
    successRedirect: '/eventos',
    failureRedirect: '/'
  })(req,res,next);

});

router.get('/logout', sesionActiva, (req,res,next) =>{

  req.logOut();
  res.redirect('/auth/login');
});
module.exports = router;