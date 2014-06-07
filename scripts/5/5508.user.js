// Actualizacion de Vision general Automatico
// Version 1.0
// Septiembre 5 , 2006
// Copyright (c) 2006, Pete Hanson and Edited for Ogame by Lord Mokuba
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// la idea es que la vision general se actualize cada 3 minutos para asi poder ver ataques de forma automatica y no   tener que actualizarlo manualmente
//
// ==UserScript==
// @name          Ogame Actualizacion Vision general Automatico
// @author        Lord Mokuba
// @namespace     http://www.ogame.com.es
// @description	  Actualiza la vision general automaticamente. cada cierto tiempo
// @include       http://ogame*.de/game/overview.php?*
// ==/UserScript==
//
// Constantes Globales

var ONESEC   = 1000 ;				// Un segundo (in ms)
var ONEMIN   = 60 * ONESEC ;		// Un Minuto (in ms)
var INTERVAL = 3 * ONEMIN ;			// Cada cuantos minutos se actualiza (in ms)
	
window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	INTERVAL
) ;

