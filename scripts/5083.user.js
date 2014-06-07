// ==UserScript==
// @name          Del.icio.us Ad Stripper
// @namespace     http://saul.dolgin.name
// @description	  Removes ad sidebar from del.icio.us search results
// @include       http://del.icio.us/search/*
// ==/UserScript==

var adDiv = document.getElementById('sidebar');
if (adDiv){
	adDiv.style.display = 'none';
}


