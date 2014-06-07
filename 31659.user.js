// Actualizacion de Vision general Automatico
// Version 1.0
// Septiembre 5 , 2006
// Copyright (c) 2006, Pete Hanson and Edited for Ogame by cumbiambero
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Ogame - Actualizacion Vision general Automatico (v 0.77)
// @author        cumbiambero
// @namespace     http://www.ogame.com.es
// @description	  Actualiza la vision general automaticamente entre 20 y 30 segundos.
// @include       http://ogame*.de/game/overview.php?*
// @include       http://uni*.ogame.*/game/index.php?page=overview*
// ==/UserScript==
//
// Constantes Globales

var ONESEC   = 1000 ;			// Un segundo (in ms)
var ONEMIN   = 60 * ONESEC ;		// Un Minuto (in ms)=
var MIN      = 20 * ONEMIN ;		// Minimos minutos
var MAX	     = 35 * ONEMIN ;		// Maximos minutos	

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


