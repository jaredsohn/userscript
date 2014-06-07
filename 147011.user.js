// ==UserScript==
// @name           Paywall Breaker
// @version        1.0
// @namespace      geekrunner
// @grant       none
// @description    Breaks the paywall used by the Gannett
//                 Some help obtained from here: http://stackoverflow.com/questions/2194473/can-greasemonkey-delete-cookies-from-a-given-domain and modified from http://userscripts.org/scripts/show/141911 to be site independent
// @include        *
// ==/UserScript==
(function() {
	var cookies=["EMETA_NCLICK_VISITED","EMETA_NCLICK_EPOCH","EMETA_NCLICK"];
	for(var i=0; i<cookies.length; i++) {
var href = window.location.host;
var sitedomain = window.location.host.replace (/^www\./, "");
		document.cookie = cookies[i] + "=;path=/;domain=." + sitedomain + ";expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
	}
}());