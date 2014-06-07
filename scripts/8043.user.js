// ==UserScript==
// @name           ftw.Generation Keyboard next/prev
// @namespace      http://latexblue.mechanicalmischief.com
// @description    puts the n key for next, and b key for back, and r for random on http://ftw.generation.no/
// @include        http://ftw.generation.no/*
// ==/UserScript==

var next='';
var back='';
var randurl='';
Array.slice(document.getElementsByTagName("a")).forEach(function(img)
 {
if(img.innerHTML=="Next")
{
	next=img.href;
}
if(img.innerHTML=="Prev")
{
	back=img.href;
}
if(img.innerHTML=="Random")
{
	randurl=img.href;
}
}
);

window.addEventListener("keypress", function(evt) {
 var ord=(evt.charCode || evt.keyCode);
if(ord==110)
{
	location.href=next;
}else if(ord==98)
{
	location.href=back;
}
else if(ord==114)
{
location.href=randurl;
}

},false);