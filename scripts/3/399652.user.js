// ==UserScript==
// @name            Reducelnk Skipper FoxySpeed
// @description     Automatically skips reducelnk.com timers
// @version        1.0
// updateURL       http://userscripts.org/scripts/source/399652.meta.js
// @updateURL      http://userscripts.org/scripts/source/399652.meta.js
// @downloadURL    http://userscripts.org/scripts/source/399652.user.js
// @author         Ismail Iddakuo
// @Original-s-    1.0.1 http://userscripts.org/scripts/show/168239
// @include     *reducelnk.co*
// @include     *rdlnk.co*
// @grant       none
// @icon        https://reducelnk.com/imagesfiles/favicon.ico
// ==/UserScript==

urlHolder = document.getElementById("urlholder");
if (urlHolder != null) {
 document.location.href = urlHolder.value;
}