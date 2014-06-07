// ==UserScript==
// @name			TheWestNotes
// @namespace		TWN_M77
// @description		Notes for TheWest
// @author			Meuchelfix77 & stewue
// @include			http://*.the-west.*/game.php*
// ==/UserScript==

if (!document.getElementById ('TWN_script') ) {
	var script = document.createElement ('script');
	script.src = 'http://twm.pf-control.de/TWN.php';
	script.type = 'text/javascript';
	script.id = 'TWN_script';
	document.getElementsByTagName ('body')[0].appendChild (script);
}