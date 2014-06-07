// ==UserScript==
// @name           Anti-YT-Landessperre
// @namespace      YouTubeLändersperre
// @description    Wenn ein Video länderbedingt (in Deutschland) nicht verfügbar ist, wird eine Weiterleitung zu Google Translate erzeugt, sodass man das Video sehen kann.
// @include        http://*.youtube.com/*
// ==/UserScript==

var ytlink = GM_getValue('ytlink', '');for (var i=0; i < document.links.length-1; i++) {   if (document.links[i].href.indexOf('/watch?v=') > -1) {	document.links[i].addEventListener("click", function () { GM_setValue('ytlink', this.href); }, false);   }}if (document.body.innerHTML.indexOf('Es ist in deinem Land nicht mehr') > -1) {   if (confirm("Da dieses Video in DE nicht verfügbar ist über Google umleiten?")) {	document.location.href = 'http://translate.google.de/translate?hl=de&sl=en&tl=de&u=' + encodeURIComponent(ytlink);   }}