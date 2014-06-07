// ==UserScript==
// @name           fucked up character replacement
// @namespace      http://userscripts.org/users/110369
// @include        *
// ==/UserScript==

function foo(){
	var x=document.body.innerHTML;
	var y=x.split('»');
	x=y.join('"');
	y=x.split('«');
	x=y.join('"');
	document.body.innerHTML=x;}

window.addEventListener('load',foo,true);
