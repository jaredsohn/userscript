// ==UserScript==
// @name        Haxball
// @description Dodaje ikone gry haxball 
// @namespace   http://www.wykop.pl/ludzie/SebusPL/
// @include     http://www.wykop.pl/*
// @include     http://wykop.pl/*
// @version     0.3
// @author      SebusPL
// ==/UserScript==

$('nav.main div.quickpoint:eq(2)').clone().appendTo('nav.main').children('a')
	.attr({
		href: 'http://www.haxball.com/',
		title: 'Graj w HaxBall',
		target: '_blank'
	}).attr(
		'style', 'background: url("http://i.imgur.com/mHryyzA.png") no-repeat 2px 0 !important'
	).hover(function(){
		$(this).attr('style', 'background: transparent url("http://i.imgur.com/mHryyzA.png") no-repeat 2px 0 !important');
	},function(){
		$(this).attr('style', 'background: url("http://i.imgur.com/aYbo2Vk.png") no-repeat 2px 0 !important');
	})
	.children('span').remove();
