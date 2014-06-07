// ==UserScript==
// @name           MegaUpload Auto Start Download
// @namespace      Laymain
// @description    MegaUpload Auto Start Download
// @include        http://*.megaupload.com/?d=*
// ==/UserScript==

setTimeout('if ((dlLink = document.getElementById("downloadlink")))window.location.href = dlLink.firstChild.href;',
           parseInt(document.getElementById("countdown").innerHTML)*1000+1);
