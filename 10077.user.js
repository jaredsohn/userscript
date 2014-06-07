// ==UserScript==
// @name           Scroll Up 100px On Load
// @namespace      http://userscripts.org/
// @description    Scroll up 100 pixels on window load
// ==/UserScript==

function scrollUpOnLoad(evt) {
  window.scroll(0, 100);
}

window.addEventListener('load', scrollUpOnLoad, true);