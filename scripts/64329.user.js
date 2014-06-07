// ==UserScript==
// @name		  vBulletin 4 Signature Remover
// @namespace	  http://userscripts.org/scripts/show/58824
// @description   Removes signatures on vbulletin 4.
// @version       0.1
// @include       http://*forum*
// @exclude	   
// ==/UserScript==
(function() {
	var getsig = document.getElementsByTagName('blockquote');
	var attribs = "";
		for (var i = getsig.length - 1; i >= 0; i--) {
			attribs = getsig[i].getAttribute('class');
			if(attribs == "signature restore"){
				getsig[i].parentNode.removeChild(getsig[i]);
			}
		}
	}
)();