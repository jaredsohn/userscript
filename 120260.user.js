// ==UserScript==
// @name	2dgal Shush!
// @namespace	http://bbs.9gal.com/
// @description	shut somebody's hell up!
// @include	http://bbs.9gal.com/*
// @include	http://bbs.9baka.com/*
// @include	http://9gal.com/*
// @include	http://9baka.com/*
// @resource  zipGal	 http://mcpub.googlecode.com/files/2dgal_shutUp_Build_1.2.9.6.js
// @version 1.2.9.6
// ==/UserScript==
if(navigator.userAgent.match(/Firefox/))
{
var zipGal=GM_getResourceText('zipGal');
var script=document.createElement('script');
script.setAttribute('charset','utf-8');
script.setAttribute('type','text/javascript');
script.innerHTML=zipGal;
document.body.appendChild(script);
}
else
{
javascript:var b=document.body;
if(b&&!document.xmlVersion)
{void(shush=document.createElement('script'));
void(shush.src="http://mcpub.googlecode.com/files/2dgal_shutUp_Build_1.2.9.6.js");
void(shush.setAttribute('charset','utf-8'));
void(b.appendChild(shush));}else{}
}