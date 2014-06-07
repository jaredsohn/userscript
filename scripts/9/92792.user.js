// ==UserScript==
// @name           Finalmobster geen sneeuw
// @namespace      Finalmobster geen sneeuw
// @include        http://www.finalmobster.nl/*
// @include        http://finalmobster.nl/*
// ==/UserScript==

var js = document.createElement("script");
	js.innerHTML = "var snowmax = -1; var snowminsize = 0; snowmaxsize = 0;";

var voor = document.getElementById('right');
	voor.parentNode.insertBefore(js,voor);

var js = document.getElementsByTagName('script');
var jsl = document.getElementsByTagName('script').length;

for(i = 0; i < jsl; i++){
	if(js[i].src == 'http://astuforum.free.fr/js/neige_lettre.js'){
		var sneeuw = js[i];
	}
}

if (sneeuw) {
    sneeuw.parentNode.removeChild(sneeuw);
}

for(i = 0; i <= 30; i++){
	document.getElementById('s'+i).style.display = 'none';
}