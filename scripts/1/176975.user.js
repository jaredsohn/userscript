// ==UserScript==
// @name        ZgłośIkona
// @description Dodaje ikone zgłoszeń
// @namespace   http://www.wykop.pl/ludzie/SebusPL/
// @include     http://www.wykop.pl/*
// @include     http://wykop.pl/*
// @version     1.0
// @author      SebusPL
// ==/UserScript==

$('nav.main div.quickpoint:eq(2)').clone().appendTo('nav.main').children('a')
	.attr({
		href: 'http://www.wykop.pl/naruszenia/moje/',
		title: 'Sprawdź zgłoszenia',
		target: '_blank'
	}).attr(
		'style', 'background: url("http://imageshack.us/scaled/landing/585/dhy5.png") no-repeat 2px 0 !important'
	).hover(function(){
		$(this).attr('style', 'background: transparent url("http://imageshack.us/scaled/landing/35/f0w8.png") no-repeat 2px 0 !important');
	},function(){
		$(this).attr('style', 'background: url("http://imageshack.us/scaled/landing/585/dhy5.png") no-repeat 2px 0 !important');
	})
	.children('span').remove();
