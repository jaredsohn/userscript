// ==UserScript==
// @name SU V4 Annoyance Remover2
// @version 1.01
// @namespace http://www.justmyimagination.com
// @description Combines functions of previous/deprecated scripts into one.
// @include http://*.stumbleupon.com/*
// @copyright Â© JustMyImagination 2011
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];
var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.innerHTML ='.hilight { background-color: transparent !important; } .listStumble .hilight ul.controls a{background-color: transparent !important; } .body { background: transparent !important; } body.theme20 #content{background: transparent !important; } body.theme20 #footer { background: transparent !important; } .reviewProfile .img img{ margin: -5px -3px -20px 0 !important; }';
headID.appendChild(cssNode);