// ==UserScript==
// @name           StackOverflow Chat - RTL
// @namespace      kobi
// @include        http://chat.stackoverflow.com/rooms/*
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$(function(){
setInterval(function(){
$('div.content')
.filter(function(){
	var div = $(this);
	var text = div.text();
	var rtlLetter = text.replace(/[^\u0590-\u05FF\u0600-\u06FF\uFB50-\uFDFF\u2000-\u206F]+/g,'');
	var neutral = text.replace(/[^\s\d.,()!?\-+*\/\\]+/g, '');
	return rtlLetter.length  > (text.length - neutral.length) / 2;
}).css('direction','rtl');
$('.monologue .timestamp').css('margin-left','5px');
},1000);
});//doc.ready