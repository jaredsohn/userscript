// ==UserScript==
// @name        Achtung
// @namespace   OK
// @include     http://www.wykop.pl/*
// @include     http://wykop.pl/*
// @version     1.0
// @author      Wiceps
// ==/UserScript==

$('nav.main div.quickpoint:eq(2)').clone().appendTo('nav.main').children('a')
	.attr({
		href: 'http://curvefever.com/play2.php',
		title: 'Graj w Achtunga!',
		target: '_blank'
	}).attr(
		'style', 'background: url("http://i.imgur.com/KQs04FA.png") no-repeat 2px 0 !important'
	).hover(function(){
		$(this).attr('style', 'background: transparent url("http://i.imgur.com/A9Ggh9S.png") no-repeat 2px 0 !important');
	},function(){
		$(this).attr('style', 'background: url("http://i.imgur.com/KQs04FA.png") no-repeat 2px 0 !important');
	})
	.children('span').remove();