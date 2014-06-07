// ==UserScript==
// @name           Ссылки на комментарии на exler.ru
// @namespace      http://unrar.me/gmns
// @description
// @include        http://exler.ru/*
// @include        http://*.exler.ru/*
// ==/UserScript==

var comments = $('div[id^=comm]');

for(var i = 1; i < comments.length; i++) {
	var comment = $(comments[i]);
	var id = parseInt(comment.attr('id').replace('comm', ''));
	//comment.parent().find('div > div > a').parent().prepend('<a href="'+ window.location.toString() +'#c'+ id +'">#</a>&nbsp;');
	comment.parent().find('div > div > span').append(' (' + window.location.toString() + '#c'+ id +')');
}
