// ==UserScript==
// @name           DR112
// @namespace      http://vk.com/app1804162_2162137?ref=9
// @include        http://vkontakte.ru/app1804162_2162137?ref=9*
// ==/UserScript==

Sys.Application.add_init(function() { 
	document.getElementsByTagName("button")[1].onclick();
}); 