// ==UserScript==
// @name       RYM: Show rating shortcut on release page
// @version    0.1
// @match      https://rateyourmusic.com/release/*
// @copyright  2014+, thought_house
// ==/UserScript==

var $ = unsafeWindow.jQuery;

var shortcut = $('.my_review .review_publish_status .album_shortcut').val();
if (shortcut != '[Rating0]') {
	$('.release_my_catalog div.clear').before('<div><input class="album_shortcut" readonly style="width:100px;margin-top:0;float:none;" onclick="focus();select();" value="' + shortcut + '" /></div>');
}