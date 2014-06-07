// ==UserScript==
// @name        Fler.cz autopager
// @namespace   http://www.fler.cz
// @description Automatické načítání stránek katalogu
// @include     http*://www.fler.cz/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// ==/UserScript==

var log = (unsafeWindow.console) ? unsafeWindow.console.log : GM_log;

var sm = sm || {};
$.extend(sm, {

	autopager: {

		offset: -800,
		q: '#btnLoadMore',


		init: function() {
			$(window).on('scroll', function(e) {
				if ($(window).scrollTop() >= ($(sm.autopager.q).offset().top + sm.autopager.offset)) {
					sm.autopager.loadPage();
				}
			});
		},

		loadPage: function() {
			var e = document.createEvent('HTMLEvents');
			e.initEvent('click', true, true);
			$(sm.autopager.q)[0].dispatchEvent(e);
		}

	}
});

sm.autopager.init();