// ==UserScript==
// @name        Pokaż całość Wykop.pl
// @namespace   http://userscripts.org/scripts/show/486489
// @include http://*.wykop.pl/*
// @version     1
// @grant       none
// @run-at	document-end
// ==/UserScript==

$('.show-more').mouseover(function () {
        $(this) .prev('.text-expanded') .replaceWith($(this) .prev('.text-expanded') .html());
        $(this) .hide();
});