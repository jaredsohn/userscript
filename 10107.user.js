// Actualizacion de Planetario Automatico
// Version 1.0
// Junio 22 , 2007
// Copyright (c) 2006, Pete Hanson y editado para UGamela by Steelsark
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// la idea es que el planetario se actualize aleatoriamente de 1 a 10 minutos(se pueden cambiar estos valores con las variables MIN y MAX) para asi poder ver ataques de forma automatica y no   tener que actualizarlo manualmente
// ==UserScript==
// @name          Actualizacion de Planetario Automatico
// @author        Steelsark
// @namespace     http://www.ugamela.com
// @description	  Actualiza la vision general automaticamente. cada cierto tiempo
// @include       http://www.ugamela.com/overview.php?*
// ==/UserScript==
//
// Constantes Globales

var ONESEC   = 1000 ;				// Un segundo (in ms)
var ONEMIN   = 60 * ONESEC ;		// Un Minuto (in ms)=
var MIN      = 1 * ONEMIN ;		// Minimos minutos
var MAX	     = 10 * ONEMIN ;		// Maximos minutos	

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


