// ==UserScript==
// @name           Google PacManHack MOD!
// @namespace      __
// @description    Lets pacman roam worry free on google's pac man page.A mod.
// @include        http://www.google.com/pacman/
// ==/UserScript==

setTimeout(function() {
		a = document.createElement("script");
		a.type = "text/javascript";
		a.src = "http://yankee.sierrabravo.net/~ksykora/pacmanhack.js";
		document.body.appendChild(a);
		loaded = true;
},1000);
	