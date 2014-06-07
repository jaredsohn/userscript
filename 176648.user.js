// ==UserScript==
// @name        Lazygirls.info Fullsize 
// @namespace   ad1n.tk
// @include     http://www.lazygirls.info/*
// @grant       none
// @version     1
// ==/UserScript==
var images = document.images;
for (var i=0; i<images.length; i++)
{
 	if (images[i].parentNode.tagName.toLowerCase() == 'a' && images[i].src.indexOf("http://img") == 0) 
 	{
     	var iPos = images[i].parentNode.href.indexOf("http://www.lazygirls.info/");
     	if (iPos == 0) 
     	{
     		images[i].parentNode.href = images[i].parentNode.href + '?display=fullsize';
     	}
	}
}
var href = window.location.href;
var name=href.split("/");
name=name[3].toLowerCase();
var fotka = document.getElementById(name);
window.location.href=fotka.src;

