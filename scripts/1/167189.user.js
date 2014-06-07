// ==UserScript==
// @name        MS FB Game Hack
// @namespace   msfbgamehack
// @include     https://fb.mito.hu/microsoft/memoriajatek/*
// @version     2.1
// @resource 	customCSS	https://dl.dropboxusercontent.com/u/5041550/msfbmemorygamehack/hackv21.css  
// ==/UserScript==
GM_addStyle(GM_getResourceText("customCSS"));
var NewLink = document.createElement('script')
NewLink.src="https://dl.dropboxusercontent.com/u/5041550/msfbmemorygamehack/mainv8.js"