// ==UserScript==
// @name	Ukrywacz zer
// @namespace	http://userscripts.org/scripts/show/151973
// @author	kasper93
// @description	Ukrywa liczbę plusów gdy jest równa zero. Szczególnie te wszechobecne zera na mikroblogu... Dodatkowo ukrywa ikonkę plusa przy naszych wpisach i tak na własne nie można głosować.
// @include	http://*wykop.pl/*
// @include	https://*wykop.pl/*
// @downloadURL	https://userscripts.org/scripts/source/151973.user.js
// @updateURL	https://userscripts.org/scripts/source/151973.meta.js
// @version	1.1.3
// @grant	none
// @run-at	document-end
// ==/UserScript==

function main() {
	$(function() {
		$('.votes strong:not(".separated") span').filter(function () {
			return $(this).text() === '0';
		}).hide();

		$('.votes strong.separated').filter(function () {
			return ($(this).find('span:first').text() === '0' && $(this).find('span:last').text() === '0');
		}).hide();
		
		ukryjmikro();
	});
	
	$(document).ajaxComplete(function() {
		ukryjmikro();
	});
	
	$('div.recentPlaceHolder').on("click", function () {
		window.setTimeout(function () {
			ukryjmikro();
		}, 500);
	});
	
	function ukryjmikro() {
		$('#activities-stream .votC span').filter(function () {
			return $(this).text() === '0';
		}).remove();
		var nick = $('.quickpoint a[title="Przejdź do swojego profilu"]').text();
		$('#activities-stream strong.fbold:contains(' + nick + ')').closest('blockquote').find('.icon.plus').remove();
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