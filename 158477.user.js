// ==UserScript==
// @name           LeperPressSound
// @namespace      http://kt.era.ee/lepra/
// @description    Добавляет звук в экран игры LeperPress
// @include        http://леттерпресс.рф/game/play/*
// ==/UserScript==

function includeScript(url, onload) {
	var s = document.createElement("script");
    s.src = url;
	s.onload = onload;
    document.body.appendChild(s);
}

includeScript("http://userscripts.org/scripts/source/158476.user.js");