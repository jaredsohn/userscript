// ==UserScript==
// @name           Zelly's Delete Guide from Youtube
// @description    Deletes the Guide from all Youtube pages providing a cleaner interface so you don't accidentally click on invisible menu links with javascript disabled.
// @author         Zelly
// @homepage       http://userscripts.org/scripts/show/174235
// @version        0.01
// @updateURL      https://userscripts.org/scripts/source/174235.meta.js
// @downloadURL    https://userscripts.org/scripts/source/174235.user.js
// @include     http*://*youtube.com/*
// @grant       none
// ==/UserScript==

var element = document.getElementById("guide");
element.parentNode.removeChild(element);