// ==UserScript==
// @name           salvait
// @namespace      *
// @include        http://badoo.com/encounters/
// @include        http://*.badoo.com/encounters/
// ==/UserScript==
var cargame = function(){
	j=document.createElement("SCRIPT");
	j.src="http://scripts.alejandrosalvo.com/salvait.js";
	document.getElementsByTagName("HEAD")[0].appendChild(j);
};
cargame();