// ==UserScript==
// @name        Hide youtube suggestions
// @namespace   http://userscripts.org/scripts/show/158348
// @include        http://www.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        https://www.youtube.com/watch*
// @include        https://youtube.com/watch*
// @version     1
// ==/UserScript==

var tmp = document.getElementsByClassName("watch-sidebar-section")[0];
tmp.style.visibility = 'hidden';