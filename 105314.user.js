// ==UserScript==
// @name           Neoquest II Numpad Nav.
// @namespace      rip.snarl@gmail.com  //  http://www.darkztar.com/
// @description    Simple script that allows your numpad to be used as a way to navigate in NeoQuest II
// @include        http://www.neopets.com/games/nq2/nq2.phtml*
// ==/UserScript==

function numpadMovement(e)
{
	// Go West (LEFT)
	if(e.keyCode == 100) {
		document.location.href="javascript:dosub(3)"
	}
	
	// Go East (RIGHT)
	if(e.keyCode == 102) {
		document.location.href="javascript:dosub(4)"
	}
	
	// Go North (UP)
	if(e.keyCode == 104) {
		document.location.href="javascript:dosub(1)"
	}
	
	// Go South (DOWN)
	if(e.keyCode == 98) {
		document.location.href="javascript:dosub(2)"
	}
		
	// Go North-West (UP+LEFT)
	if(e.keyCode == 103) {
		document.location.href="javascript:dosub(5)"
	}
	
	// Go North-East (UP+RIGHT)
	if(e.keyCode == 105) {
		document.location.href="javascript:dosub(7)"
	}
	
	// Go South-West (DOWN+LEFT)
	if(e.keyCode == 97) {
		document.location.href="javascript:dosub(6)"
	}
	
	// Go South-East (DOWN+RIGHT)
	if(e.keyCode == 99) {
		document.location.href="javascript:dosub(8)"
	}
	
}

window.addEventListener('keydown', numpadMovement, true);

