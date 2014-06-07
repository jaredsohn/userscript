// ==UserScript==
// @name           playing.spoiler
// @namespace      www.boomie.se
// @include        http*playing.se/*
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];         
var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';

cssNode.innerHTML ="\
		.viewTspoiler::selection\
		{\
			background: #b5d5ff;\
			color: black;\
		}\
		\
		.viewTspoiler::-moz-selection\
		{\
			background: #b5d5ff;\
			color: black;\
		}\
";

headID.appendChild(cssNode);