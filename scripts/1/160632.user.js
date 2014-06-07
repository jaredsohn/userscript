// ==UserScript==
// @name            Eliminar Codigo Tny.Cz
// @description     Elimina el cuadro de peticion de codigo en tny.cz, para poder ver el paste completo.
// @include         http://*.tny.cz/*
// @include         http://tny.cz/*
// @version    1.0
// @copyright  2012, Felipe Moreno (www.fripas.org)
// ==/UserScript==

var Cuadro = document.getElementById('promo-overlay');
var Padre = Cuadro.parentNode;
Padre.removeChild(Cuadro);
Cuadro = document.getElementById('promo-followshows');
Padre = Cuadro.parentNode;
Padre.removeChild(Cuadro);