// ==UserScript==
// @name           Comicslate DirectEdit
// @description    comicslate.org в "карте сайта" ссылки на редакторы страниц
// @version        1.0
// @icon           http://comicslate.org/lib/tpl/tempe/logo/flo.png
// @include        http://comicslate.org/*
// ==/UserScript==

var links = document.getElementsByTagName("a");
for (var i=0; i<links.length; i++) {
 if (window.location.search == '?do=index' || window.location.search.match('idx=')) {
  links[i].href = links[i].href.replace(/^http:(.+)(\d+[a-z]?)$/i,"http:$1$2?do=edit")
 }
}