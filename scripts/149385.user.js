// ==UserScript==
// @name           Piriform Forum - Don't Remember Me!
// @namespace      http://shanegowland.com
// @description    Unchecks the 'remember me' box on forum.piriform.com
// @include        http://forum.piriform.com/*
// ==/UserScript==

var cBoxes=document.getElementsByTagName('input')

for (var i=0; i < cBoxes.length; i++) {

    if (cBoxes[i].type=="checkbox") {

	cBoxes[i].checked=false

    }

}