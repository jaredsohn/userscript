// ==UserScript==
// @name           Removes ads from Facebook
// @namespace      com.ishammohamed.hidefbads
// @description    Removes the sponsored ads from Facebook
// @version        1.0
// @include        https://www.facebook.com/*
// ==/UserScript==


var adz= document.querySelector('div[class="ego_column"]');

if (adz) {
  adz.parentNode.removeChild(adz);
}