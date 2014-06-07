// ==UserScript==
// @name           imagehosting sites
// @namespace      #avg
// @description    Show only the image on imageshack and imageflux
// @include        http://*imageshack.us/*
// @include        http://*imageflux.net/ver.php?*
// @include        http://*largeimagehost.com/img*
// @version        0.2.1
// ==/UserScript==
$=function(x) {return document.getElementById(x)};

function getImg() {
var l=document.URL;
if (/imageflux/i.test(l))
	return document.images[1].src;
if (/(largeimagehost|imageshack)/i.test(l))
	return $('thepic').src;
}

location.replace(getImg());