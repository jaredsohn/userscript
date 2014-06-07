// ==UserScript==
// @name			Enable imageshack direct links
// @description		Enables the "Direct Link" textboxes if you're not a member
// @version			1.0
// @namespace		dazarobbo
// @include			http://*imageshack.us/*
// @author			dazarobbo
// @copyright		2012, dazarobbo
// @license			(CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==

var ib = document.getElementById("ImageCodes") ? document.getElementById("ImageCodes").getElementsByTagName("input") : [];

for(var i=0; i<ib.length; i++){
	if(ib[i].disabled){
		ib[i].disabled = false;
		ib[i].ondoubleclick = null;
		ib[i].onclick = null;
		ib[i].onselectstart = null;
		ib[i].onmousedown = null;
	}
}