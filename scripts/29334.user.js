// ==UserScript==
// @name           Telvisthing
// @namespace      ioni.no-ip.com
// @description    Removes stupid space from page.
// @include        http://www.telvis.fi/*
// ==/UserScript==

function removeThisElement(removeThis){
	var parent = removeThis.parentNode;
	parent.removeChild(removeThis);
}


//poistetaan logo
var top = document.getElementById('topcont');
removeThisElement(top.childNodes[1]);

//koon säätö
top.style.height = 'auto';

//ajan siirto
var time = top.childNodes[2];
time.style.top = '0px';
time.style.position = 'relative';
time.style.marginTop = '12px';