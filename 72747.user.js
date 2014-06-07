// ==UserScript==
// @name           Kings Of Chaos - Purple Theme
// @namespace      http://*kingsofchaos.com/*
// @description    Spidey's KoC
// @include        http://*kingsofchaos.com/*
// @exclude		   http://www.kingsofchaos.com/confirm.login.php*
// @exclude		   http://*.kingsofchaos.com/index.php*
// @exclude		   http://*.kingsofchaos.com/error.php*
// @exclude        http://www.kingsofchaos.com/stats.php*
// ==/UserScript==

// Author: Lopina

var css = 'th {' +
		'background-color: #270D29;' +
		'border: #A11DAD 2px solid;' +
		'color: #FFFFFF;' +
		'font-size: 10pt;' +
		'font-weight: bold;' +
		'font-family: "Verdana";' +
		'border-collapse: collapse;' +
		'}' +
		'a:link {' +
		'color: #A11DAD;' +
		'}' +
		'a:visited {' +
		'color: #A11DAD;' +
		'}' +
		'a:hover, a:active {' +
		'color: #A11DAD;' +
		'}';

if((!document.URL.match('index.php')) && (document.URL.match('kingsofchaos.com')) && (!document.URL.match('error.php'))){
addCSS(css);
}

function addCSS(css){ 
	GM_addStyle(css);
}