// ==UserScript==
// @name           TrennKill
// @namespace      TrennKill
// @description    Manuelle Silbentrennung ist pfui!
// @include        file:///home/jochen/Desktop/test.html
// ==/UserScript==

s = document.body.innerHTML;
document.body.innerHTML= s.replace( /(>?[^<]*\b\W*)-(\W*\b[^>*]<?)/g, "$1$2");
