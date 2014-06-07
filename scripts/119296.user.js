// ==UserScript==
// @name                        douban_instapaper
// @namespace              		douban_instapaper
// @version                     1.3
// @reason						Update for Greasemonkey 1.0 grant
// @author                      Mescoda on http://mescoda.com/
// @description              	Help instapapering pages on Douban.com 
// @include                     http://movie.douban.com/review/*
// @include                     http://movie.douban.com/subject/*
// @include                     http://book.douban.com/review/*
// @include                     http://book.douban.com/subject/*
// @include                     http://www.douban.com/note/*
// @include                     http://www.douban.com/group/topic/*
// @include                     http://site.douban.com/widget/notes/*
// @require                     http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @grant 						GM_addStyle
// ==/UserScript==

$(document).ready(function() {
	$('#content .article').addClass('instapaper_body');
	$('#content .bd .note-content pre').addClass('instapaper_body');
});