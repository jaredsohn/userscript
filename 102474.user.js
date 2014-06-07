// ==UserScript==
// @name           SU V4 Annoyance Remover1
// @version	    	1.01
// @namespace       http://www.justmyimagination.com
// @description     Removes that annoying 'more info' from below avipic.
// @include         http://*.stumbleupon.com/*
// @copyright       © JustMyImagination 2011
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];         
var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.innerHTML ='.body { background: transparent !important; } body.theme20 #content{background: transparent !important; } body.theme20 #footer { background: transparent !important; } .reviewProfile .img img{ margin: -5px -3px -20px 0 !important; }';
headID.appendChild(cssNode);