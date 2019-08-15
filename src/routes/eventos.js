const express = require('express');
const router = express.Router();

const pool = require('../database');
const {sesionActiva} = require('../lib/sesion');

router.get('/agregar' , sesionActiva, (req , res) => {
  res.render('eventos/agregar');
});
router.post('/agregar', sesionActiva, async(req,res) => {
  const {nombre, categoria, lugar,direccion,fechaInicio,fechaFin,tipo} = req.body;
  const evento = {
    user_id: req.user.id,
    nombre: nombre,
    categoria: categoria,
    lugar: lugar,
    direccion: direccion,
    fecha_inicio: fechaInicio,
    fecha_fin: fechaFin,
    tipo_evento: tipo
  };
  await pool.query('INSERT INTO eventos set ?',[evento]);
  res.redirect('/eventos');
});

router.get('/', sesionActiva, async(req,res) => {
  const eventos = await pool.query('SELECT * FROM eventos WHERE user_id = ?',[req.user.id]);
  res.render('eventos/listar', {eventos});
});

router.get('/eliminar/:id', sesionActiva, async(req,res) => {
  const { id } = req.params;
  const eventos = await pool.query('DELETE FROM eventos WHERE ID =?',[id]);
  res.redirect('/eventos');
});

router.get('/editar/:id', sesionActiva, async(req,res) => {
  const { id } = req.params;
  const eventos = await pool.query('SELECT * FROM eventos WHERE ID =?',[id]);
  res.render('eventos/editar',{evento: eventos[0]});
});

router.post('/editar/:id', sesionActiva, async(req,res) => {
  const { id } = req.params;
  const {nombre, categoria, lugar,direccion,fechaInicio,fechaFin,tipo} = req.body;
  const evento = {
    nombre: nombre,
    categoria: categoria,
    lugar: lugar,
    direccion: direccion,
    fecha_inicio: fechaInicio,
    fecha_fin: fechaFin,
    tipo_evento: tipo
  };
  const eventos = await pool.query('UPDATE eventos SET ? WHERE ID =?',[evento,id]);
  res.redirect('/eventos');
});


module.exports = router;
