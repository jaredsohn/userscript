// ==UserScript==
// @name           Flree-lance.ru direct links
// @author         Igor Koldarev
// @namespace      http://koldarev.nnov.ru
// @version        1.2
// @description    Обход страницы «Переход по внешней ссылке»
// @include        http://*free-lance.ru/*
// ==/UserScript==
(function()
{
	for( i in document.links) {
		var elem = document.links[i];
		if (elem.href.match(/.+\/a\.php\?href=(.+)/i)) {
			elem.href=elem.title;
		}
	}
})();