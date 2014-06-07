// ==UserScript==
// @name          Elizabitsch's - Colour Themes
// @namespace      http://*kingsofchaos.com/*
// @description    Colour
// @include        http://*kingsofchaos.com/*
// @exclude		   http://www.kingsofchaos.com/confirm.login.php*
// @exclude		   http://*.kingsofchaos.com/index.php*
// @exclude		   http://*.kingsofchaos.com/error.php*
// @exclude        http://www.kingsofchaos.com/stats.php*
// ==/UserScript==

// Author: chaosking

var css = 'th {' +
		'background-color: #FFD700;' +
		'border: #4169E1 5px solid;' +
		'color: #FF0000;' +
		'font-size: 10pt;' +
		'font-weight: bold;' +
		'font-family: "verdana";' +
		'border-collapse: collapse;' +
		'}' +
		'a:link {' +
		'color: #FF4500;' +
		'}' +
		'a:visited {' +
		'color: #FF4500;' +
		'}' +
		'a:hover, a:active {' +
		'color: #1E90FF;' +
		'}';

if((!document.URL.match('index.php')) && (document.URL.match('kingsofchaos.com')) && (!document.URL.match('error.php'))){
addCSS(css);
}

function addCSS(css){ 
	GM_addStyle(css);
}