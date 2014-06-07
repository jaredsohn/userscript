// ==UserScript==
// @name           FlashGrabber
// @namespace      MundoFlasheur
// @description    Recupération aisée des jeux flashs sur absoluflash.com 
// @include        http://www.absoluflash.com/jeux-flash/*
// ==/UserScript==

var temp = document.body.innerHTML;
var FlashURL = (new RegExp("http://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+\\.swf","g")).exec(temp);
GM_openInTab(FlashURL);
window.close();