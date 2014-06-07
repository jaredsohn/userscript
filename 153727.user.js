// ==UserScript==
// @name        Alza.cz autopager
// @namespace   http://www.alza.cz
// @description Automatické načítání stránek katalogu
// @include     http*://www.alza.cz/*
// @include     http*://www.kleopatra.cz/*
// @include     http*://www.hracky.cz/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// ==/UserScript==

var log = (unsafeWindow.console) ? unsafeWindow.console.log : GM_log;

var alza = alza || {};
$.extend(alza, {
	autopager: {

		offset: -800,
		q: '#loadmoreInner .btnmore',

		init: function() {
			$(window).on('scroll', function(e) {
				if ($(window).scrollTop() >= ($(alza.autopager.q).offset().top + alza.autopager.offset)) {
					alza.autopager.loadPage();
				}
			});
		},

		loadPage: function() {
			var e = document.createEvent('HTMLEvents');
			e.initEvent('click', true, true);
			$(alza.autopager.q)[0].dispatchEvent(e);
		}

	}
});

alza.autopager.init();