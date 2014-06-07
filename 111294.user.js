// ==UserScript==
// @author              Jason Rhyley
// @name                Stellar.io keyboard pagination
// @namespace           http://rhyley.org/gm/
// @description         Press the right arrow for the next page.
// @include             http://stellar.io/*
// ==/UserScript==

(function() { 
function KeyCheck(e) {
	var KeyID = (window.event) ? event.keyCode : e.keyCode;

	switch(KeyID) {

		case 39:
			n=document.getElementById('pagination').innerHTML;
			n=n.split('href="')[1];
			n=n.split('"')[0];
			// ^ hackety hack hack. If only nested .firstChilds worked as expected…
			location.href = n;
		break;
	}
}

document.onkeyup = KeyCheck;
})();
