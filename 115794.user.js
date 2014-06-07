// ==UserScript==
// @name           Facebook - Colour Themes
// @namespace      http://*facebook.com/*
// @description    FB
// @include        http://*facebook.com/*
// ==/UserScript==

// Author: Casper-TH

var css = 'th {' +
		'background-color: #FFD700;' +
		'border: #8B0000 3px solid;' +
		'color: #FF0000;' +
		'font-size: 10pt;' +
		'font-weight: bold;' +
		'font-family: "verdana";' +
		'border-collapse: collapse;' +
		'}' +
		'a:link {' +
		'color: #FF8C00;' +
		'}' +
		'a:visited {' +
		'color: #FF8C00;' +
		'}' +
		'a:hover, a:active {' +
		'color: #0000FF;' +
		'}';

if((!document.URL.match('index.php')) && (document.URL.match('facebook.com')) && (!document.URL.match('error.php'))){
addCSS(css);
}

function addCSS(css){ 
	GM_addStyle(css);
}