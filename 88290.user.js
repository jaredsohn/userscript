// ==UserScript==
// @name           Redirects aus externen Links entfernen
// @namespace      Pennergame
// @description    Dieses Script entfernt die Redirects aus den Links zu externen Seiten außerhalb von Pennergame.
// @include        http://muenchen.pennergame.de/*
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.split('http://www.muenchen.pennergame.de/redirect/?site=').join('');