// ==UserScript==
// @name           Morning Theme
// @namespace      http://*kingsofchaos.com/*
// @description    Colour
// @include        http://*kingsofchaos.com/*
// @exclude		   http://www.kingsofchaos.com/confirm.login.php*
// @exclude		   http://*.kingsofchaos.com/index.php*
// @exclude		   http://*.kingsofchaos.com/error.php*
// @exclude        http://www.kingsofchaos.com/stats.php*
// ==/UserScript==

// Author: chaoskingster

var css = 'th {' +
		'background-color: #FFD700;' +
		'border: #FF0000 2px solid;' +
		'color: #FF0000;' +
		'font-size: 10pt;' +
		'font-weight: bold;' +
		'font-family: "Verdana";' +
		'border-collapse: collapse;' +
		'}' +
		'a:link {' +
		'color: #C0C0C0;' +
		'}' +
		'a:visited {' +
		'color: #C0C0C0;' +
		'}' +
		'a:hover, a:active {' +
		'color: #C0C0C0;' +
		'}';

if((!document.URL.match('index.php')) && (document.URL.match('kingsofchaos.com')) && (!document.URL.match('error.php'))){
addCSS(css);
}

function addCSS(css){ 
	GM_addStyle(css);
}