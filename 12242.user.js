// ==UserScript==
// @name           Fapomatic Image Replace
// @namespace      *
// @description    Just loads the fapomatic image and nothing else
// @include        http://fapomatic.com/show.php?*
// ==/UserScript==

window.setTimeout(function() { window.location.href = document.getElementsByTagName('img')[1].src }, 60);