// ==UserScript==
// @name           MacRumors Ad Remover
// @description    Removes the MacRumors Banner ad.
// @version        1.1
// @author         SJMSim
// @include       http://*macrumors.com*
// @include       http://*macrumors.*.com*

// ==/UserScript==
document.getElementById("mr_banner").removeChild(document.getElementById("mr_banner_topad"));
document.getElementById("searchbox").setAttribute('style','position:relative;top:20px;');
document.getElementById("logotarget").setAttribute('style','position: absolute; top: 6px; z-index: 100;');
