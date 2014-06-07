// ==UserScript==
// @name           appinn plugin
// @namespace      caoglish
// @include        http://www.appinn.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.js
// ==/UserScript==



var comment_list=$('#cmt ol li');

comment_list.each(function(){
	comment_list.parent().prepend($(this));
});