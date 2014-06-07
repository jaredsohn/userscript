// ==UserScript==
// @name          Cambia el color de facebook
// @namespace     http://facebook.com/profile.php?id=100001756188015
// @description	  Cambia el color de facebook
// @include       https://www.facebook.com/*
// @include       https://facebook.com/*
// @include       http://www.facebook.com/*
// @include       http://facebook.com/*
// ==/UserScript==

if(typeof(Storage)!=="undefined")
{
	if(!sessionStorage.fbcolour)
	{
		var fbcol=prompt('Ingresa el color deseado en formato HTML. (E.j.: red=rojo, blue=azul, green=verde, #869CB2 etc.');
		sessionStorage.fbcolour=fbcol;
	}
}
else
{
	alert("Su navegador no admite el almacenamiento web. Su color por defecto será de color verde");
	sessionStorage.fbcolour="green";
}
var x=document.getElementsByTagName("a");
for(i=0;i<x.length;i++)
x[i].style.color=sessionStorage.fbcolour;
void 0;