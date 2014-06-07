// ==UserScript==
// @name           Tapuz Maavaron killer
// @description    fixes the annoying ad before pages.
// @version        0.3
// @include        http://*.tapuz.co.il/*aavaron.asp*
// ==/UserScript==

document.location.replace(unescape(location.href.replace('maavaron.asp?tolink=',"")));
