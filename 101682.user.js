// ==UserScript==
// @name           SU V4 Disable Post Area Gradient
// @version	    	1.07
// @namespace       http://www.justmyimagination.com
// @description     Removes the dark gradient overtop the post area on all SU pages.
// @include         http://*.stumbleupon.com/*
// @copyright       © JustMyImagination 2011
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];         
var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.innerHTML ='.body { background: transparent !important; } body.theme20 #content{background: transparent !important; }';
headID.appendChild(cssNode);