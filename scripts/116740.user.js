// ==UserScript==
// @name           Tuenti bot
// @namespace      Tuentibot
// @description    Tuenti bot
// @include        http://www.youtube.com/*

// @version        1
// ==/UserScript==




function addElement(){
    var capa = document.getElementById("watch-description");
var h1 = document.createElement("h1");
h1.innerHTML = "texto";
	

	capa.appendChild(h1);
}

onload = addElement;