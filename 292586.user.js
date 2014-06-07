// ==UserScript==
// @name        ogame.Fix_Activar_Objecte
// @namespace   ogame
// @description Posa a lloc el botó d'activar un objecte en la vista de movil
// @include     http://s122-es.ogame.gameforge.com/game/index.php?page=shop*
// @version     1
// @author		kalvin arts
// @grant       none
// ==/UserScript==

setInterval(function () 
{
	$('a.activateItem').css('margin', '10px 0 0 0');
}, 500);