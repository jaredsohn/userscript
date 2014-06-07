// ==UserScript==
// @name       AO3 Tools
// @namespace  http://random.fangirling.net/fun/ao3/
// @version    1.0
// @description Removes empty paragraph tags; more features coming.
// @match      http://*.archiveofourown.org/*
// @copyright  2012+, Flamebyrd
// ==/UserScript==
(function($) {
	$("p").filter( function() { var html = $(this).html(); return (html == '' || html == '&nbsp;') }).remove();
})(unsafeWindow.jQuery);