// ==UserScript==
// @name           Sea Theme
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
		'background-color: #00FFFF;' +
		'border: #7FFFD4 3px solid;' +
		'color: #006400;' +
		'font-size: 10pt;' +
		'font-weight: bold;' +
		'font-family: "Verdana";' +
		'border-collapse: collapse;' +
		'}' +
		'a:link {' +
		'color: #90EE90;' +
		'}' +
		'a:visited {' +
		'color: #90EE90;' +
		'}' +
		'a:hover, a:active {' +
		'color: #006400;' +
		'}';

if((!document.URL.match('index.php')) && (document.URL.match('kingsofchaos.com')) && (!document.URL.match('error.php'))){
addCSS(css);
}

function addCSS(css){ 
	GM_addStyle(css);
}