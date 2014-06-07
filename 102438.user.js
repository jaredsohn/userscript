// ==UserScript==
// @name            SU V4 test4footer
// @version	    	1.02
// @namespace       http://www.justmyimagination.com
// @description     Leinnea
// @include         http://*.stumbleupon.com/*
// @copyright       ©2011 JustMyImagination 
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];         
var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.innerHTML = '.body { background: transparent !important; } body.theme20 #content{ background: transparent !important; } body.theme20 #footer { background: transparent !important; }';
headID.appendChild(cssNode);