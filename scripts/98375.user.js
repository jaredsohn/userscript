// ==UserScript==
// @name           Shortnews Countdown-Werbung überspringen
// @namespace      http://userscripts.org/scripts/show/98375
// @description    Überspringt die neue Shortnews-Werbung
// @author         Knuff
// @version        1.0
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        http://da.feedsportal.com/*
// ==/UserScript==

(function(){

	location.href = (document.getElementsByTagName("a")[document.getElementsByTagName("a").length-1].href);

})();