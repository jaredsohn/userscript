// ==UserScript==
// @name           Redirect Expert Exchange via proxy at http://webforth.com
// @namespace      http://experts-exchange.com
// @description  This script will automatically redirect all your experts-exchange.com  proxy at http://webforth.com
// @include        http://*.experts-exchange.com/*
// @include        https://*.experts-exchange.com/*
// @author    Saurabh Minni
// ==/UserScript==
/*
 * Version 1.0
 * Author by - the100rabh , India
 * Blog : http://the100rabh.blogspot.com 
 * Tech Blog: http://controlenter.in 
 */
if (window.location.host.match("experts-exchange.com")) {
	var myPath = "http://webforth.com/fuqee/index.php?url=";
	myPath = myPath + escape(window.location);
	window.document.location = myPath;
}