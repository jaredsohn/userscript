// ==UserScript==
// @name        Fast Spoiler Wykop.pl
// @namespace   http://userscripts.org/scripts/show/486489
// @include     http://*.wykop.pl/*
// @version     1.2
// @grant       none
// @run-at      document-end
// ==/UserScript==
$('body').delegate('a.showSpoiler', 'mouseover', function () {
    $(this).hide();
    $(this).next('code').show();
});