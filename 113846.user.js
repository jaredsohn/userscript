// ==UserScript==
// @name	Ukryj Wykop poleca
// @namespace	http://userscripts.org/scripts/show/113846
// @author	kasper93
// @description	Ukrywa znaleziska polecane i sponsorowane, pochyla czcionkę tytułów oraz dodaje oznaczenie "Wykop Poleca" dla znalezisk partnerskich tj. poleconych, które zostały wykopane przez użytkowników. 
// @include	http://*.wykop.pl/*
// @include	https://*.wykop.pl/*
// @icon	http://img7.imagebanana.com/img/jl5vqqxv/ico.png
// @downloadURL	https://userscripts.org/scripts/source/113846.user.js
// @updateURL	https://userscripts.org/scripts/source/113846.meta.js
// @version	1.7.7
// @grant	none
// @run-at	document-end
// ==/UserScript==
/* Skrypt jest modyfikacją http://userscripts.org/scripts/show/71641 na potrzeby nowej wersji Wykop.pl 3.0. */

function main() {
	$.ukryj = function () {
		// Ukrywanie znalezisk poleconych oraz sponsorowanych
		$(".scale:last-child a[href*='wykop.pl/reklama']").closest('article').remove();
		$("#slideshow a[href*='wykop.pl/paylink']").closest('.slidebox').remove();

		// Pochylenie czcionki tytułu znalezisk partnerskich oraz dodanie oznaczenie "Odkryte Wykop Poleca"
		$(".scale:last-child a.link[href*='wykop.pl/link/partnerredirect/']").each(function () {
			$(this).closest('header').css("font-style", "italic");
			$(this).closest('.cc6').prepend('<a title="Odkryte Wykop Poleca, przejdź do skryptu" class="link gray" href="http://userscripts.org/scripts/show/113846"><span>Odkryte Wykop Poleca</span></a>');
		});

		// Ukrywanie reklam w urwisku
		$(".scale:last-child div#dying-links-box a[href*='wykop.pl/market']").each(function () {
			var u = $(this).closest("article");
			var t;
			if (u.next().length > 0) {
				t = u.next()
			} else {
				t = u.closest("div").children(":first")
			}
			t.show();
			u.remove();
			if (t.closest("#dying-links-box").children().length == 1) {
				t.find('.navigate a').remove();
			}
		});

		// Ukrywanie trackerów
		$('img[src*="wykop.pl/tracker/emiter"]').remove();
		$('a[href*="wykop.pl/tracker/"]').remove();
		
		// Ukrywanie reklamy appki wykopu
		$('.baner-mobile').parent('#fixedBox').remove();
	};

	if ($.isFunction($.ukryj)) {
		$.ukryj();
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