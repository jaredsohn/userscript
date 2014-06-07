// ==UserScript==
// @author 		   Pikachu2012
// @name           JTV hkgicon
// @version 	   3.3
// @description    JTV hkgicon
// @namespace      http://code.google.com/p/jtvhkgicon/
// @include        http://justin.tv/*
// @include        http://*.justin.tv/*
// @include        http://twitch.tv/*
// @include        http://*.twitch.tv/*
// ==/UserScript==

function hkg()
{
	script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = "http://jtvhkgicon.googlecode.com/svn/OPEN/hkgiconff.js?"+Math.random();
	thehead = document.getElementsByTagName('head')[0];
	if(thehead) thehead.appendChild(script);
}
hkg();

function js1()
{
	js1 = document.createElement('script');
	js1.type = 'text/javascript';
	js1.src = "http://jtvhkgicon.googlecode.com/svn/js-global/FancyZoom.js";
	js1head = document.getElementsByTagName('head')[0];
	if(js1head) js1head.appendChild(js1);
}
js1();

function js2()
{
	js2 = document.createElement('script');
	js2.type = 'text/javascript';
	js2.src = "http://jtvhkgicon.googlecode.com/svn/js-global/FancyZoomHTML.js";
	js2head = document.getElementsByTagName('head')[0];
	if(js2head) js2head.appendChild(js2);
}
js2();

function onload()
{
	body = document.getElementsByTagName('body')[0];
	body.setAttribute("onload", "setupZoom()");
}
onload();