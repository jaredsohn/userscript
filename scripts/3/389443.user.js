// ==UserScript==
// @name        oschina
// @namespace   oschina
// @description auto focus on search input and change search type to blog
// @include     http://www.oschina.net/
// @version     1
// @grant       none
// ==/UserScript==

$(function(){
	$('form.search>input[name=scope]').val('blog');
	$('#channel_q').focus();
});