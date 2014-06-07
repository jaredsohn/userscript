// ==UserScript==
// @name			Linkify OKCupid Profile Location to Google Maps
// @description		Linkify OKCupid Profile Location to Google Maps
// @include			http://www.okcupid.com/profile/*
// @version			1.0
// ==/UserScript==

var locE = document.getElementById('ajax_location');
var location = locE.textContent;
//alert(location);

var newSrc = "https://www.google.com/maps/preview#!q="+location;
var link = document.createElement('a');
link.setAttribute("href",newSrc);
link.setAttribute("target","_blank");
link.innerHTML = location;
locE.parentNode.replaceChild(link,locE);