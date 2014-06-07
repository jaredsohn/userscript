// ==UserScript==
// @name	Wykop odwróć strony
// @namespace	http://userscripts.org/scripts/show/117648
// @author	kasper93
// @description	Odwraca numeracje stron na wykopie.
// @include http://*.wykop.pl/*
// @exclude	/^http://www\.wykop\.pl/(info|regulamin|reklama|polityka-prywatnosci|pomoc|kontakt|osiagniecia|grupy|developers|gry)//
// @exclude	/^http://[a-z]+\.wykop\.pl/(ramka|link|dodaj)/*/
// @downloadURL	https://userscripts.org/scripts/source/117648.user.js
// @updateURL	https://userscripts.org/scripts/source/117648.meta.js
// @version	1.0.3
// @grant	none
// @run-at	document-end
// ==/UserScript==


function main() {
	var ostatniastrona = $('.pager .button').not(':contains("następna"), :contains("poprzednia")').last().html();
	$('.pager .button').not(':contains("następna"), :contains("poprzednia")').each(function (index) {
		$(this).html(ostatniastrona - $(this).html() + 1);
	});
}

if (document.getElementsByClassName('pager').length > 0) {
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
}

function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
}