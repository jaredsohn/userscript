// ==UserScript==
// @name        Youtube - subs default
// @namespace   None
// @description Sets "My subscriptions" as the default tab on youtube
// @include     http://www.youtube.com/
// @version     1
// @run-at      document-start
// ==/UserScript==

if (!document.referrer.startsWith('http://www.youtube.com/feed/')) {
	document.location.replace('http://www.youtube.com/feed/subscriptions/u');
}
