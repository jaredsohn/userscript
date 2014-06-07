// ==UserScript==
// @name           hvadsigerjakob
// @namespace      jakob
// @include        http://hvadsigerjakob.dk
// @include        http://hvadsigerjakob.dk/
// @include        http://hvadsigerjakob.dk/*
// ==/UserScript==

var divs;
divs = document.getElementsByTagName("div");

for(var i = 0; i < divs.length; i++) {
	if(divs[i].getAttribute("class") == "JakobMeningen") {
		divs[i].innerHTML = '<img id="jakob" src="/jakob_Ved ikke.jpg" alt="Jakob har svaret"/>';
	}
	if(divs[i].getAttribute("class") == "JakobSvaret") {
		divs[i].innerHTML = 'Jakob siger: <b>Ved ikke</b>';
	}
}