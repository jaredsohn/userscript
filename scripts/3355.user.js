// ==UserScript==
// @name           Ninja Jump to Referer
// @namespace      http://www.kuribo.info/
// @description    In Ninja Analyzer(http://www.shinobi.jp/), You can jump to referer page automatically.
// @include        http://www.shinobi.jp/etc/goto.html?*
// ==/UserScript==

location.href = location.href.replace("http://www.shinobi.jp/etc/goto.html?", "");
