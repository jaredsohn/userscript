// ==UserScript==
// @name            SU V4 Disable mouseover background change
// @version	    	0.15
// @namespace       http://www.foresthippy.com
// @description     John
// @include         http://*.stumbleupon.com/*
// @copyright       © John Mackay 2010
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];         
var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.innerHTML = '.hilight { background-color: transparent !important; } .listStumble .hilight ul.controls a{background-color: transparent !important; }';
headID.appendChild(cssNode);