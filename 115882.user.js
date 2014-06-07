// ==UserScript==
// @name          Dark Night Time
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
		'background-color: #000000;' +
		'border: #000080 2px solid;' +
		'color: #000080;' +
		'font-size: 10pt;' +
		'font-weight: bold;' +
		'font-family: "Verdana";' +
		'border-collapse: collapse;' +
		'}' +
		'a:link {' +
		'color: #000080;' +
		'}' +
		'a:visited {' +
		'color: #000080;' +
		'}' +
		'a:hover, a:active {' +
		'color: #3CB371;' +
		'}';

if((!document.URL.match('index.php')) && (document.URL.match('kingsofchaos.com')) && (!document.URL.match('error.php'))){
addCSS(css);
}

function addCSS(css){ 
	GM_addStyle(css);
}