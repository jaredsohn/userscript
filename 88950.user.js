// ==UserScript==
// @name           MCL tabindex
// @namespace      bravo/greasemonkey
// @description    Set tabindex for preview/post keys
// @include        http://mycoffeelounge.net/forum-replies.php?*
// @include        http://www.mycoffeelounge.net/forum-replies.php?*
// @include        http://mycoffeelounge.net/forum-edit.php?*
// @include        http://www.mycoffeelounge.net/forum-edit.php?*
// ==/UserScript==

document.getElementById("preview").setAttribute("tabindex", 3);
document.getElementById("post3").setAttribute("tabindex", 4);