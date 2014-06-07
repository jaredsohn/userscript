// ==UserScript==
// @name           Metrolyrics JavaScript Killbits (Protection + No-Rightclick) Disabler
// @namespace      com.nol888.UserScripts
// @include        http://www.metrolyrics.com/*
// @description	   Provides a way to disable the useless "lyrics protection" (no text selecting allowed for lyrics) and rightclick prevention.
// ==/UserScript==

unp = document.createElement('script');
unp.appendChild(document.createTextNode((<r><![CDATA[

cancelClick = null;

document.onmousedown 	= null; 
window.onmousedown		= null; 
document.onkeydown 		= null;

iframe_lyrics = document.getElementById("iframe_lyrics");
doc = iframe_lyrics.contentDocument;

if (doc == undefined || doc == null)
	doc = iframe_lyrics.contentWindow.document;

doc.oncontextmenu	= null;
doc.onmousedown		= null;
doc.onclick			= null;
doc.onselectstart	= null;
doc.onselect		= null;

]]></r>).toString()));
document.getElementsByTagName('head')[0].appendChild(unp);