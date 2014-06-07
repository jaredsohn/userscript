// ==UserScript==
// @name           "Wykop.pl - " z tytulu usuwacz
// @namespace      ??
// @description    Usuwa "Wykop.pl - " z tytulu wykopu co by mozna bylo widziec na tabie tytul znaleziska.
// @include        *wykop.pl*
// ==/UserScript==

document.title = document.title.replace(/^Wykop.pl - /, '')
