// ==UserScript==
// @name           Remove Ad On the Right of Grooveshark
// @namespace      g
// @description    This removes the advertisement bar on the right of Grooveshark
// @include        http://listen.grooveshark.com/
// ==/UserScript==

document.getElementById('adBar').parentNode.removeChild(document.getElementById('adBar'));
document.getElementById('mainContentWrapper').style.marginRight = '0px';