// ==UserScript==
// @name           Lyricsfreak
// @namespace      lyricsfreak
// @include        http://www.lyricsfreak.com/
// ==/UserScript==

document.getElementById('lyrics').style.visibility = "visible";
document.getElementById('lyrics').innerHTML = document.getElementById('content_h').innerHTML;