// ==UserScript==
// @name           Direct Link Enable
// @namespace      Kastro187420
// @include        http://*imageshack.us/content_round.php?*
// @description    Pops up a Box allowing you to copy the Direct Image Link
// ==/UserScript==

var link = document.getElementsByClassName("readonly");
prompt("Direct link to your Image. Click OK to close",link[1].value);