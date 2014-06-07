// ==UserScript==
// @name        WoH
// @namespace   http://localhost/
// @description Werbung Deaktivieren
// @include     http://*.*world-of-hentai.to*
// @version     1.1
// ==/UserScript==

document.body.onload = null;

var elmDeleted = document.getElementById("MarketGidComposite2060");
elmDeleted.parentNode.removeChild(elmDeleted);

var elmDeleted = document.getElementById("ad_global_above_footer");
elmDeleted.parentNode.removeChild(elmDeleted);