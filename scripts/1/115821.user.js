// ==UserScript==
// @name           Girl Theme
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
		'background-color: #FF69B4;' +
		'border: #FFC0CB 3px solid;' +
		'color: #8A2BE2;' +
		'font-size: 10pt;' +
		'font-weight: bold;' +
		'font-family: "Verdana";' +
		'border-collapse: collapse;' +
		'}' +
		'a:link {' +
		'color: #EE82EE;' +
		'}' +
		'a:visited {' +
		'color: #EE82EE;' +
		'}' +
		'a:hover, a:active {' +
		'color: #800080;' +
		'}';

if((!document.URL.match('index.php')) && (document.URL.match('kingsofchaos.com')) && (!document.URL.match('error.php'))){
addCSS(css);
}

function addCSS(css){ 
	GM_addStyle(css);
}