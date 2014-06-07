// ==UserScript==
// @name           shaun-hall-raku.co.uk
// @namespace   shaun-hall-raku.co.uk   
// @description    Makes images on when your mouse is out small icon
// @include        http://www.shaun-hall-raku.co.uk/*
// ==/UserScript==
var Imgs = document.getElementsByTagName("img");
for(var i=0;i<Imgs.length;i++)
{
	if(Imgs[i].id){
	Imgs[i].setAttribute("onMouseOut","");
	}
} 