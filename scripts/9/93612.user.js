// ==UserScript==
// @name           atmajoga.pl alert
// @description    wyłącza komunikat wyskakuący po kliknięciu prawym lub środkowym przyciskiem myszy
// @include        http://www.atmajoga.pl/*
// ==/UserScript==

(unsafeWindow || window).document.onmouseup = undefined;
(unsafeWindow || window).document.oncontextmenu = undefined;
