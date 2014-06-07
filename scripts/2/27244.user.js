// ==UserScript==
// @name          Rapidshare fixer v1.2
// @namespace     K3rN3L http://userscripts.org/users/52751/scripts
// @description   fixes some rapidshare issues.
// @description   made by K3rN3L & Hlinker (members of www.TuniTech.net)
// @include       http://*.rapidshare.com/*
// @include       http://rapidshare.com/*
// @exclude       http://rs*.rapidshare.com/*
// ==/UserScript==

var lien=location.href;
if((lien.indexOf('www.rapidshare')==-1)&&(lien.indexOf('ssl.rapidshare')==-1)&&!(done)){
	window.location.replace("http://www." + lien.substring(lien.indexOf("")+7));
//it only does simple url rewriting to make rapidshare accessible again...

}