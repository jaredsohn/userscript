// ==UserScript==
// @name           MegaUpload Instant Download
// @namespace      Laymain
// @description    MegaUpload Instant Download : No Wait
// @include        http://*.megaupload.com/?d=*
// ==/UserScript==

var dlLink = document.getElementById('downloadlink');
if (dlLink) window.location.href = dlLink.firstChild.href;