// ==UserScript==
// @name        @games link layer activate
// @namespace   makinamiatgameslinklayeractivate
// @include     http://sns.atgames.jp/*
// @include     http://www.atgames.jp/*
// @include     http://art.atgames.jp/*
// @version     1
// ==/UserScript==
(function (d, func) {
	if (!window.jQuery) {
		var h = d.getElementsByTagName('head')[0];
		var s1 = d.createElement("script");
		s1.setAttribute("src", "http://www.atgames.jp/atgames/html/common/js/lib/jquery.js");
		s1.addEventListener('load', function() {
			var s2 = d.createElement("script");
			s2.textContent = "jQuery.noConflict();(" + func.toString() + ")(jQuery);";
			h.appendChild(s2);
		}, false);
		h.appendChild(s1);
	}
})(document, function($) {
//start
var i = '<script src="http://www.atgames.jp/atgames/html/000-centralisRegnare/generated_js/quicklink.html"></script>';
jQuery('body').append(i);
});