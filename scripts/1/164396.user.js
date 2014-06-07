// ==UserScript==
// @name         Wowhead Fixed Search Header
// @description  Makes the page header (the search box) "sticky" when you scroll.
// @namespace    drnick
// @downloadURL  https://userscripts.org/scripts/source/164396.user.js
// @updateURL    https://userscripts.org/scripts/source/164396.meta.js
// @include      *wowhead.com*
// @grant        none
// @version      1.0.2
// ==/UserScript==

(function() {

	if (typeof jQuery == "undefined") throw "jQuery not found";
	if (window.top != window.self) return;
	
	var $ = jQuery;
	
	var $window = $(window);
	var $topbar = $("#topbar");
	
	if ($topbar.length == 0) throw "#topbar not found";
	
	var styles = [
		"#topbar.sticky {",
			"position: fixed;",
			"top: 0;",
			"z-index: 9999;",
			"width: " + $topbar.width() + "px;",
			"box-shadow: 0 10px 8px #000;",
		"}",
	].join("\n");
	
	$liveSearchStyle = $("<style type='text/css'></style");
	
	$("head").append("<style type='text/css'>" + styles + "</style>");
	$("head").append($liveSearchStyle);
	
	var offset = $topbar.offset().top;
	var height = $topbar.height();
	
	var $dummy = $topbar.clone();
	$dummy.empty();
	$dummy.attr("id", "topbar-dummy");
	$dummy.hide();
	
	$dummy.insertAfter($topbar);
	
	$("body").append("<div class='live-search'></div>");
	
	$window.scroll(function() {	
		if ($window.scrollTop() > offset) {
			$topbar.addClass("sticky");
			$dummy.show();
		}
		else {
			$topbar.removeClass("sticky");
			$dummy.hide();
		}
		
		$liveSearchStyle.html(".live-search { top: " + ($topbar.offset().top + height) + "px !important; }");
	});
	
	$window.trigger('scroll');
	
})();