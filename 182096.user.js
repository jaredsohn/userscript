// ==UserScript==
// @name       Imgsrc Auto Adskip
// @namespace  http://mattman00000.com
// @version    0.5
// @description  automatic bypass of imgsrc ads
// @match      http://*/*imgsrc.ru*
// @copyright  2012+, mattman00000
// ==/UserScript==

    console.warn("Activating adskip");
    window.location.assign("http://".concat(window.location.href.substring(window.location.href.indexOf("imgsrc.ru"))));