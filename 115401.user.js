// ==UserScript==
// @name           feedrepostblocker
// @namespace      vkscript
// @include        http://vk.com/feed?section=posts
// @include        http://vk.com/feed
// @include        https://vk.com/feed?section=posts
// @include        https://vk.com/feed

// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.js

// ==/UserScript==

$("#feed_wall").bind("DOMNodeInserted", letsrock);

function letsrock(){
	$('table.published_by_wrap').parents(".feed_row ").remove();
}