// ==UserScript==
// @name           No ads
// @namespace      http://userscripts.org/users/82346
// @description    Say bye to that ugly ads.
// @include        *
// ==/UserScript==

var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://hyper.acualicio.us/no_ads.css';
cssNode.media = 'screen';
cssNode.title = 'Greasemonkey';
document.getElementsByTagName("head")[0].appendChild(cssNode);