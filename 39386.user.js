// ==UserScript==
// @name           emuparadise auto redirect
// @namespace      userscripts.org
// @description    Dirty hack to auto redirect where you have to click banners in order to proceed downloading
// @include        http://www.emuparadise.org/*/download.php
// ==/UserScript==

document.location = "javascript:redirect()";