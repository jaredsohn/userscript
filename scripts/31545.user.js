// ==UserScript==
// @name           Runescape - Remove NavBar & Ads
// @namespace      x3r0ss@gmail.com
// @description    Removes the NavBar on top of the window so that the runescape HD applet occupies the complete window(instead of leaving a black space with the NavBar on top)
// @include *world*.runescape.com/*
// ==/UserScript==

var MenuBox = document.getElementById('menubox');
MenuBox.parentNode.removeChild(MenuBox);


Scripts = document.getElementsByTagName('script');
var AdScript = Scripts[0]
if(AdScript) {
	AdScript.parentNode.removeChild(AdScript);
}
var AdBox = document.getElementById('tb');
if(AdBox) {
	AdBox.parentNode.removeChild(AdBox);
} 