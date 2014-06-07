// ==UserScript==
// @name        YouTube Default to My Subscriptions
// @namespace   https://userscripts.org/users/aemony
// @description Makes YouTube automatically redirect you to your Subscription page if signed in.
// @include	*://*.youtube.com/
// @exclude	/^https?:\/\/\w+\.youtube\.com\/\w+$/
// @run-at	document-start
// @version     1.0
// ==/UserScript==

var regex = new RegExp("/feed/subscriptions[/u]*");

// Check if cookie SID can be found (seems to be used when signed in)
if( document.cookie.indexOf("SID") != -1 && !document.referrer.match(regex))
{
	document.location = document.URL + "feed/subscriptions";
}