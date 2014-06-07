// ==UserScript==
// @name	MPC-HC link ticket number to trac
// @namespace	http://userscripts.org/scripts/show/159974
// @author	kasper93
// @description	Converts ticket number to link to the trac.
// @include	https://github.com/*/mpc-hc*
// @downloadURL	https://userscripts.org/scripts/source/159974.user.js
// @updateURL	https://userscripts.org/scripts/source/159974.meta.js
// @version	1.3.0
// @grant	none
// @run-at	document-end
// ==/UserScript==


function main() {
	$(function () {
		replace();

		$(document).on('pjax:complete', function () {
			replace();
		});
	});

	function replace() {
		$('.commit-desc, .commit-title, .comment-content').each(function () {
			$(this).html($(this).html().replace(/#(\d{1,4})\b(?![^<]*?<\/a>)/gi, '<a target="_blank" href="https://trac.mpc-hc.org/ticket/$1">$&</a>'));
		});
	}
}

if (typeof $ == 'undefined') {
	if (typeof unsafeWindow !== 'undefined' && unsafeWindow.jQuery) {
		// Firefox
		var $ = unsafeWindow.jQuery;
		main();
	} else {
		// Chrome
		addJQuery(main);
	}
} else {
	// Opera
	main();
}

function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
}