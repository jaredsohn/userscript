// ==UserScript==
// @name           eRepublik Auto Refresh
// @namespace      eRepublik Auto Refresh
// @description    Auto Refresh eRepublik page when 500 error
// @autor          Botherlong
// @match  	       http://www.erepublik.com/*
// @include  	   http://www.erepublik.com/*
// @version        0.0.1
// @date	       2011-09-07
// ==/UserScript==

/* Changelog:
v0.0.1 (2011-09-27)
	- First public release
*/

if(document.getElementsByTagName('title')[0].innerHTML.indexOf('500 - Internal Server Error')!=-1) setTimeout(function() { document.location.reload(); } , 500);