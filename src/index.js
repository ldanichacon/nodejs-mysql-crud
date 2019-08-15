const express = require('express');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const mySQLStore = require('express-mysql-session');
const {database} = require('./keys');
//initializations
const app =express();
require('./lib/passport');
//settings
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set ('view engine','ejs');
//Middlewares
app.use(session({
  secret: 'crudsession',
  resave: false,
  saveUninitialized: false,
  store: new mySQLStore(database)
}));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Global Variables
app.use((req,res,next)=>{
  app.locals.usuario = req.user;
  next();
});

//Rutes
app.use(require('./routes'));
app.use('/auth',require('./routes/auth'));
app.use('/eventos',require('./routes/eventos'));

//Public
app.use(express.static(path.join(__dirname,'public')));

//Starting the server
app.listen(app.get('port'),()=>{
  console.log('server on port', app.get('port'));
});