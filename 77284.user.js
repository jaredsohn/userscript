// ==UserScript==
// @name           Google PacManHack!
// @namespace      http://nerdery.com/people/ks
// @description    Lets pacman roam worry free on google's homepage.
// @include        http://www.google.com/
// ==/UserScript==

setTimeout(function() {
		a = document.createElement("script");
		a.type = "text/javascript";
		a.src = "http://yankee.sierrabravo.net/~ksykora/pacmanhack.js";
		document.body.appendChild(a);
		loaded = true;
},1000);
	
