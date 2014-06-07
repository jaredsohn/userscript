// ==UserScript==
// @name        Google+ External Link Cleaner
// @namespace   http://yungsang.com/+
// @description Reset external links to a default behavior (especially for FluidApp)
// @include     https://plus.google.com/*
// @author      YungSang
// @version     0.3.1
// ==/UserScript==

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")(jQuery.noConflict());";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

addJQuery(function($) {

	function reset_link() {
		$('a[href^="http"]').filter(':not(.elc_parsed)').each(function() {
			var $this = $(this).addClass('elc_parsed');
			if (/^https:\/\/plus\.google\.com\//.test(this.href)) {
				return;
			}
			$this.attr('target', '_blank');
			this.onclick = function(event) {
				event.stopPropagation();
				return true;
			};
		});
		setTimeout(reset_link, 500);
	}

	reset_link();

});