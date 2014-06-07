// ==UserScript==
// @name			Truppen Ankunftsfilter
// @namespace		Off Ankunftszeit Filter
// @description		Filtert Dörfer mit einer bestimmten Anzahl von Truppen auf ein Dorf heraus *** Very Special Thanks to: xXNo M3rcyXx für die Paypal-Spende :) Special Thanks an: Stylettor, Sam Nujoma, Harry Klassen, ThrillPhil, Dom2183, xDuffmanx, Mariies, commanderurxus, Benesch Tom, Bult, Funzogga, rocktheasphalt, cenerentola, -Vanguard.- für den einen oder anderen Premiumpunkt :)
// @include			http://*.die-staemme.*/game.php?*screen=overview_villages*
// @include			http://*.staemme.*/game.php?*screen=overview_villages*
// @include			http://*.die-staemme.*/game.php?*screen=place*
// @include			http://*.staemme.*/game.php?*screen=place*
// @include			http://*.die-staemme.*/game.php?*screen=info_player&id=*
// @include			http://*.staemme.*/game.php?*screen=info_player&id=*
// @include			http://*.die-staemme.*/game.php?*screen=info_village&id=*
// @include			http://*.staemme.*/game.php?*screen=info_village&id=*
// @include			http://*.die-staemme.*/game.php?village=*&screen=overview
// @include			http://*.staemme.*/game.php?village=*&screen=overview
// @exclude			http://*.die-staemme.*/game.php?*&screen=place&try=confirm
// @exclude			http://*.staemme.*/game.php?*&screen=place&try=confirm
// @exclude			http://*.die-staemme.*/game.php?*&screen=map
// @exclude			http://*.staemme.*/game.php?*&screen=map


// ==/UserScript==


//***************************************************************************
//***                         truppenfilter.user.js
//**                       -------------------------
//**  author               : TM4rkuS
//**  copyright            : (C)  Markus Rohlof, Sascha Ulbrich
//**  based on		 	   : Sush, Heinzelmänchen 
//**  
//***
//***************************************************************************/

var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;
$.ajaxSetup({ cache: true });
$.getScript('http://scripts.die-staemme.de/gm-scripts/truppenfilter.js');