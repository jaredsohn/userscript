// ==UserScript==
// @name        Terminek
// @namespace   Terminek
// @include     http://s*.*.ikariam.com/*
// @version     1
// ==/UserScript==

setInterval(function() {
	var dipi = document.getElementById('advDiplomacy');
	if(dipi) { dipi.style.display='none'; }
},100);