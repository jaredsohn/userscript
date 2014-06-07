// ==UserScript==
// @name        Poczatek budowy
// @namespace   whocares
// @description Wykopuje beton
// @include     http://www.wykop.pl/szukaj/*beton*
// @version     1.5
// @downloadURL	https://userscripts.org/scripts/source/168054.user.js
// @updateURL	https://userscripts.org/scripts/source/168054.meta.js
// ==/UserScript==
//http://www.wykop.pl/szukaj/beton/?search[what]=upcoming&search[sort]=new
if (typeof $ == 'undefined') {
	if (unsafeWindow.jQuery) {
		// Firefox
		var $ = unsafeWindow.jQuery;
		var hash = unsafeWindow.hash;
		var logged = unsafeWindow.logged;
		var www_base = unsafeWindow.www_base;
		main();
	} else {
		// Chrome
		addJQuery(main);
	}
} else {
	// Opera
	main();
}

function main() {
	$('.diggbox > a').filter(function() { return logged && $(this).attr('href'); }).each(function () {
		var url = www_base + 'ajax/link/vote/link/' + $(this).closest('article').data().id + '/hash/' + hash;
		$.getJSON(url, {}, function (r) {
			if (r.error) {
				alert(r.error);
				return;
			}
			console.log('Wykopano ' + r.id + ' [' + r.vote + '/' + r.bury + ']');
		});
	});
console.log('Zakonczono wykopywanie');
}

function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
}