// Actualizacion de Vision general Automatico
// Version 1.0
// Septiembre 5 , 2006
// Copyright (c) 2006, Pete Hanson and Edited for Ogame by cumbiambero
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          perro 2
// @author        neo
// @namespace     http://www.ogame.com.es
// @description	  perro
// @include       http://ogame*.de/game/overview.php?*
// @include       http://uni*.ogame.*/game/index.php?page=overview*
// ==/UserScript==
//
// Constantes Globales

var ONESEC   = 1000 ;				// Un segundo (in ms)
var ONEMIN   = 5 * ONESEC ;		// Un Minuto (in ms)=
var MIN      = 6 * ONEMIN ;		// Minimos minutos
var MAX	     = 15 * ONEMIN ;		// Maximos minutos	

function aleatorio(inferior,superior){
    numPosibilidades = superior - inferior
    aleat = Math.random() * numPosibilidades
    aleat = Math.round(aleat)
    return parseInt(inferior) + aleat
}
	
window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	aleatorio(MIN, MAX)
) ;
