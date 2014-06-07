// ==UserScript==
// @name        vita big image
// @namespace   http://userscripts.org/users/260847
// @include     http://vita.komica.org/00/*
// @include	http://*.komica.org/*/*
// @include	http://*.komica.net/*/*
// @include	http://*.komica2.net/*/*
// @include	http://*.komica3.net/*/*
// @include	http://*.komica4.net/*/*
// @include	http://komica*.dreamhosters.com/*
// @version     1
// ==/UserScript==
document.querySelector("input[name=MAX_FILE_SIZE]").value = "10000000";
var k = document.forms[1].getElementsByTagName("a");
for(var i in k){
	if(k[i].href)
		k[i].href = k[i].href.replace("-cf", "");
}