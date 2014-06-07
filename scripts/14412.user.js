// ==UserScript==
// @name            mbok2auok
// @namespace       http://stayple.net/project/greasemonkey
// @description     mbok to auok
// @include         http://www.mbok.jp/item/item_*
// @version         0.1
// ==/UserScript==

(function() {
	
	location.href = location.href.replace("www.mbok.jp", "auok.auone.jp");
	
}());
