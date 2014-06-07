// ==UserScript==
// @name           anonym speeder
// @version 1.2
// @namespace      anonym_goes_droopy
// @include        http://anonym.to/?*
// @include        http://*.anonym.to/?*
// @include        http://anonymz.com/?*
// @include        http://*.anonymz.com/?*
// @include        http://*.hiderefer.*
// @include        http://hiderefer.*


// ==/UserScript==

	meta=document.getElementsByTagName('meta');
	for (i=0; i<meta.length; i++){
	if (meta[i].getAttribute("http-equiv") == "refresh"){
	link=meta[i].getAttribute("content");
	rlink=link.substring(link.indexOf("=")+1);
	document.getElementsByTagName('html')[0].innerHTML="";
	var newWindow = window.open(rlink, '_top');
	}}
//.user.js
