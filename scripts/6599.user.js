// ==UserScript==
// @name           Zmanga title fixer
// @namespace      http://alvsbyn.nu/~anton
// @description    Strips ":: Visa ämne", ":: Index" from page titles
// @include        http://zmanga.se/forum/*
// @include        http://www.zmanga.se/forum/*
// ==/UserScript==

t = document.title;
i = t.indexOf(' - ');

if (document.title != 'Zmanga :: Index') document.title = 'Zmanga - ' + t.substring(i + 3);
else document.title = 'Zmanga';