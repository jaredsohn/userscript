// ==UserScript==
// @name        Stupid Screen
// @description skip the smartscreen when you click a link in live messenger.
// @namespace   Ammon
// @include     http://link.smartscreen.live.com/info/?a=info&*
// @version     0.01
// ==/UserScript==

(function($){
	var r = new RegExp(decodeURIComponent('%E2%80%8B'),'g')
	var url = $('#ilink').text().replace(r,'')
	location.replace(url);
})(unsafeWindow.jQuery);
