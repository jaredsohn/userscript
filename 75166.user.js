// ==UserScript==
// @name           Reddit Link
// @namespace      http://zaprox.com/js/greasemonkey
// @include        http://www.reddit.com/*/comments/*
// ==/UserScript==

(function() {	
	$ = unsafeWindow.jQuery;
	if ($) {
		$("a.title ").clone().removeClass("title ").addClass("sideLink").appendTo("div.side");
		$("a.sideLink").css("color","red").css("position", "fixed").css("right","20px").css("top","250px").css("max-width", "280px").css("z-index", "+1");
		}
})();