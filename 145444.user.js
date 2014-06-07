// ==UserScript==
// @name           LeproRenewComments
// @namespace      http://kt.era.ee/lepra/
// @description    Кнопка "обновить комментарии" станет по нажатию прятать предыдущие новые комментарии.
// @include        http://leprosorium.ru/comments/*
// @include        http://*.leprosorium.ru/comments/*
// ==/UserScript==

function includeScript(url, onload) {
	var s = document.createElement("script");
    s.src = url;
	s.onload = onload;
    document.body.appendChild(s);
}

includeScript("http://userscripts.org/scripts/source/145443.user.js");
