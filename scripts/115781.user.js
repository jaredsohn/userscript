// ==UserScript==
// @name           Reguime - Colour Theme
// @namespace      http://*kingsofchaos.com/*
// @description    Colour
// @include        http://*kingsofchaos.com/*
// @exclude		   http://www.kingsofchaos.com/confirm.login.php*
// @exclude		   http://*.kingsofchaos.com/index.php*
// @exclude		   http://*.kingsofchaos.com/error.php*
// @exclude        http://www.kingsofchaos.com/stats.php*
// ==/UserScript==

// Author: Casper-TH

var css = 'th {' +
		'background-color: #660066;' +
		'border: #FF00FF 2px solid;' +
		'color: #FF00FF;' +
		'font-size: 10pt;' +
		'font-weight: bold;' +
		'font-family: "Verdana";' +
		'border-collapse: collapse;' +
		'}' +
		'a:link {' +
		'color: #FF00FF;' +
		'}' +
		'a:visited {' +
		'color: #FF00FF;' +
		'}' +
		'a:hover, a:active {' +
		'color: #FF00FF;' +
		'}';

if((!document.URL.match('index.php')) && (document.URL.match('kingsofchaos.com')) && (!document.URL.match('error.php'))){
addCSS(css);
}

function addCSS(css){ 
	GM_addStyle(css);
}