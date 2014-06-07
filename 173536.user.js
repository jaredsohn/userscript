// ==UserScript==
// @name Kill (mb)
// @namespace http://userscripts.org/users/435308
// @include http://*.renren.com/*
// @version 1.01
// ==/UserScript==

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function main() {
	jQuery.noConflict();

	jQuery("body").bind("DOMNodeInserted", function() {
		var selector = '[src*="guibai.gif"]';
		var containers = jQuery(selector+':first-of-type').parent();

		containers.each(function() {
			var kill = jQuery(this).find(selector);
			var number = kill.length;
			kill.remove();
			if (number > 0) {
				jQuery(this).append('<span style="font-style:italic;"> (mb)*' + number + '</span>');
			}
		});
	});

}

addJQuery(main);