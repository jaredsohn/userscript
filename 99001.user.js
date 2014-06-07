// ==UserScript==
// @name           Skip Facebook Account recovery
// @namespace      https://www.facebook.com/update_security_info.php?wizard=1
// @description    Skip Facebook Account recovery
// @include     http://*.facebook.com/*
// @include     https://*.facebook.com/*
// ==/UserScript==

var oldPage = "https://www.facebook.com/update_security_info.php?wizard=1";
var newPage = "https://www.facebook.com/?ref=logo";

if (document.location.href.indexOf(oldPage) == 0)
{
	document.location.href=newPage;
}