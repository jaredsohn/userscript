// ==UserScript==
// @name            Google Logo
// @namespace       http://julianibus.kilu.de/
// @description     Google Seite anpassen
// @include         http://www.google.de/*
// ==/UserScript==


if(document.getElementById('logo'))
{
	document.getElementById('logo').style.width = "320px";
	document.getElementById('logo').style.height = "195px";
    
document.getElementById('logo').src = "http://1.bp.blogspot.com/_yKvxSUb2x3s/R9vCg4S0XuI/AAAAAAAAAQ4/XRzqGVBay3k/s320/screenshot_01.jpg";
document.title = "Dummie Google!";

	var x = document.createElement('div');
	x.setAttribute('id','div1');
	x.innerHTML="DeveloperSnippets";
	document.getElementById('xjsd').appendChild(x);
	document.getElementById('div1').innerHTML='<b>Google ist die Lösung für all deine Probleme!</b>';
    
}