// ==UserScript==
// @name           Skip Feedsportal Countdown
// @namespace      http://userscripts.org/scripts/show/98371
// @description    Skips the new (as of March 2011) Feedsportal ad with the countdown
// @author         Knuff
// @version        1.0
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        http://da.feedsportal.com/*
// ==/UserScript==

(function(){

	location.href = (document.getElementsByTagName("a")[document.getElementsByTagName("a").length-1].href);

})();