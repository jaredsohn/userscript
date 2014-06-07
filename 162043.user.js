// ==UserScript==
// @name        429 fix
// @namespace   faleij
// @description Reload upon Error 429
// @include     http://*.sankakucomplex.com/*
// @version     2
// @updateURL  	   http://userscripts.org/scripts/source/162043.meta.js
// ==/UserScript==
if(document.body.textContent.indexOf("Error 429 Too many requests") !== -1){
    unsafeWindow.setTimeout("location.reload()",3000)
}