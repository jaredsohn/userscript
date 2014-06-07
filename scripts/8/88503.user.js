// ==UserScript==
// @name           Skippub_streamiz
// @namespace      tt
// @description    redirection streamiz
// @include        http://www.streamiz.com/link.php*
// @include        http://www.streamiz.com/link[1-9].php*
// ==/UserScript==

var noeud = document.getElementById('megaup').getElementsByTagName("a")[0];
var evt = document.createEvent("MouseEvent");
evt.initMouseEvent("click", true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
// Possible danger
unsafeWindow.linkRedirectSecs = 1;
noeud.dispatchEvent(evt);