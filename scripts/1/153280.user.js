// ==UserScript==
// @name           FreeImage.us: Show only the picture
// @include        *freeimage.us/share.php*
// @namespace      https://userscripts.org/scripts/show/153280
// @updateURL      https://userscripts.org/scripts/source/153280.user.js
// @downloadURL    https://userscripts.org/scripts/source/153280.user.js
// @version        2013.01.06
// @run-at         document-start
// @grant          none
// ==/UserScript==

location.replace(location.href.replace('share.php', 'image.php'));