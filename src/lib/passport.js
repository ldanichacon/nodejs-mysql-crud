const passport = require('passport');
const strategy = require('passport-local').Strategy

const pool = require('../database');
const passwords = require('./passwords') ;
passport.use('local.signup', new strategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async(req, email, password,done)=>{
  let usuario = {
    email: email,
    password: password
  };
  usuario.password = await passwords.encriptar(password);
  const result= await pool.query('INSERT INTO usuarios SET ?', [usuario]);
  usuario.id =result.insertId;
  return done(null , usuario);
}));


passport.use('local.login', new strategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password,done) =>{
   const usuarios = await pool.query('SELECT * FROM usuarios WHERE email = ?',[email]);

  if(usuarios.length){
    const usuario = usuarios[0];
    const passValida = await passwords.comparar(password,usuario.password);
    if(passValida){
      done(null,usuario);
    }
    else{
      done(null, false);
    }
  }
  else{
    done(null, false);
  }

}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const filas = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  done(null, filas[0]);
});
