// ==UserScript==
// @name           KoL Taller Topmenu
// @namespace      http://userscripts.org/users/75549
// @include        *127.0.0.1*game.php
// ==/UserScript==

var topframeset = top.document.getElementsByTagName && top.document.getElementsByTagName("frameset");
topframeset[1].rows = "70,*";