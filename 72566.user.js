// ==UserScript==
// @name			Pardus Ship Marker
// @namespace		marnick.leau@skynet.be
// @description		Marks the tile your ship is on.
// @include			http://*.pardus.at/main.php
// ==/UserScript==

try {
	function script() {
		var nfs = [];
		var nav = document.getElementById('navarea');
		
		if (nav.getElementsByClassName('nf') !== undefined) {
			nfs = nav.getElementsByClassName('nf');
		}
		else {
			if (nav.getElementsByClassName('nf96') !== undefined) {
				nfs = nav.getElementsByClassName('nf96');
			}
			else {
				nfs = nav.getElementsByClassName('nf128');
			}
		}
		
		nfs[Math.floor(nfs.length / 2)].style.border = "thin dashed red";
		
		// You may change the marking ("thin dashed red") in the following ways:
		// -thin/medium/thick
		// -dashed/solid/dotted/inlet/outlet/groove/ridge
		// -other basic color, hexadecimal notation or RGB notation (http://en.wikipedia.org/wiki/Web_colors)
	}

	script();

	if (unsafeWindow.checkToDo !== undefined) {
		var local_checkToDo = unsafeWindow.checkToDo;
		unsafeWindow.checkToDo = function() {
			local_checkToDo();
			setTimeout(script,1);
		}
	}
}
catch(error) {
	alert(error);
}