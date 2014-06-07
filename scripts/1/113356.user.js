// ==UserScript==
// @name       Anti-loose by TiNez (anonym_x)
// @version    0.8
// @description  Very simple anti "ACU EPITA loose" JS script to use with Tempermonkey(not tested on Greasemonkey). When your intra is overloosed ;).
// @include    https://*acu.epita.fr/intra/*
// @copyright  2011+, TiNez, contact: tinez.y@gmail.com
// ==/UserScript==

document.head.getElementsByTagName("link")[0].setAttribute("href", "style/sky.css");;
parent.document.body.removeChild(document.body.getElementsByTagName("table")[0]);
