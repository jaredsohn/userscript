// ==UserScript==
// @name           :L Alfa 1
// @namespace      http://logout.hu/tag/lezso6.html
// @description    Lecseréli az "l" betqket :L-re
// @include        http://logout.hu/muvelet/hsz/uj.php?thrid=889120
// ==/UserScript==

document.getElementsByTagName('textarea')[0].addEventListener('keyup', function(event) { event.target.value = event.target.value.replace(/l/g, ':L'); }, false);