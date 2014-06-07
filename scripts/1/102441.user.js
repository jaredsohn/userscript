// ==UserScript==
// @name            SU V4 test4font
// @version	    	1.01
// @namespace       http://www.justmyimagination.com
// @description     Leinnea
// @include         http://*.stumbleupon.com/*
// @copyright       ©2011 JustMyImagination 
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];         
var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.innerHTML = '.body { background: transparent !important; } body.theme20 #content{ background: transparent !important; } body.theme20 #footer { background: transparent !important; } body, textarea, input { font-family: "Maiandra GD" !important; text-shadow: 01px 1px 1px Black !important; }';
headID.appendChild(cssNode);