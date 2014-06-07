// ==UserScript==
// @name       Windows Phone Marketplace Redirect
// @namespace  http://www.windowsphone.com/
// @version    1.0
// @description Redirects you to your country's marketplace.
// @include    http://www.windowsphone.com/*/apps/*
// @copyright  2011+, singularity0821
// ==/UserScript==

//change this to your country code
var myCountryCode = "de-AT"

var pathArray = window.location.pathname.split( '/' );
var currentCountryCode = pathArray[1];
var appId = pathArray[3];

if(currentCountryCode != myCountryCode)
{
	var redirect = "http://www.windowsphone.com/" + myCountryCode + "/apps/" + appId;
	window.location.replace(redirect);
}