// ==UserScript==
// @name           GoEar No Adds
// @namespace      181958
// @author laurenceHR
// @description    Borrar la publicidad de Goear
// @include        *goear.com/*
// @version 1.0
// ==/UserScript==

function putTag(scr){
	d = document;
	var h=d.getElementsByTagName("head")[0];
	h || (h=d.body.parentNode.appendChild(d.createElement("head")));
	h.appendChild(scr);
}

function createStyle(content){
	d=document;
	var s = d.createElement("style");
	s.innerHTML = content;
	putTag(s);
}

//////////////// MAIN /////////////////

var css = 	'.arriba-publicidad, .publicidad2, .video, .publist{display:none;}\n';
createStyle(css);