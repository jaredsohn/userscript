// ==UserScript==
// @name           Youtube High Quality
// @namespace      net.kenmaz
// @description    Improves quality of the Youtube video.
// @include        http://youtube.com/watch*
// @include        http://*.youtube.com/watch*
// @exclude        http://youtube.com/watch*fmt=18
// @exclude        http://*.youtube.com/watch*fmt=18
// ==/UserScript==
window.location.replace(document.URL + "&fmt=18");


