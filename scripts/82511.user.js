// ==UserScript==
// @name  	Vkontakte Anti away.php
// @author 	http://twitter.com/Hormold
// @description Remove vkontakte away link page from all pages
// @include   	*vkontakte.ru/*
// @include   	*vk.com/*

// ==/UserScript==


var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
	if (links[i].href.split('away.php?to=').length == 2) {
		links[i].href = unescape(links[i].href.split('away.php?to=')[1]);
	}
}