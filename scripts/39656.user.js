 // ==UserScript==
// @name           arch2
// @namespace      localizador
// @description    Script para a Aliança
// @include        http://delta.astroempires.com/*
// ==/UserScript==


throbber = "http://aeintel.pcriot.com/script/indicator_mozilla_blu.gif"
var scripts = new Array(); //so there's no errors
makebutton = 0; //don't make the AE analyser button at default.

if ((document.location.href.match(/map.aspx\?cmp=2&loc/))) {
	// for the map pages. Scouting, etc
	var scripts = [ 'http://userscripts.org/scripts/source/39655.user.js'];
	makebutton = 1;
}
if ((document.location.href.match(/base.aspx\?base/))) {
	// Bases pages.
	var scripts = [ 'http://aeintel.pcriot.com/script/aeempire.js'];
}


///////////////////// don't touch this. It's for the AE analyser buttanz.
if (makebutton == 1) {
	ihtml = document.body.innerHTML;
	ihtml = ihtml.replace(/Logout<\/a>/,"Logout</a><div id='aeana'><a>EXPLORAR</a>(click)</div>");
	document.body.innerHTML = ihtml;
}

/////////////////// Implement the scripts in the page.
for (i in scripts) {
	var script = document.createElement('script');
	script.src = scripts[i];
	document.getElementsByTagName('head')[0].appendChild(script);
}