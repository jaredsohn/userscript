// ==UserScript==
// @name	Czas zniw
// @namespace	http://userscripts.org/scripts/show/167927
// @author	kasper93
// @description	Zakopuje zboze
// @include	*wykop.pl/szukaj/tags*zboze/*search*what*upcoming*
// @downloadURL	https://userscripts.org/scripts/source/167927.user.js
// @updateURL	https://userscripts.org/scripts/source/167927.meta.js
// @version	1.3
// @run-at	document-end
// ==/UserScript==

// http://www.wykop.pl/szukaj/tags:zboze/?search[what]=upcoming&search[sort]=new

if (typeof $ == 'undefined') {
	if (unsafeWindow.jQuery) {
		// Firefox
		var $ = unsafeWindow.jQuery;
		var hash = unsafeWindow.hash;
		var logged = unsafeWindow.logged;
		var group_domain = unsafeWindow.group_domain;
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
	$('.diggbox a').filter(function() { return logged && $(this).attr('href'); }).each(function () {
		var url = www_base + 'ajax/link/dig/type/5/link/' + $(this).closest(".entry").data().id + '/hash/' + hash + '/group/' + group_domain;
		$.getJSON(url, {}, function (r) {
			if (r.error) {
				alert(r.error);
				return;
			}
			console.log('zakopano ' + r.id + ' [' + r.vote + '/' + r.bury + ']');
		});
	});
}

function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);