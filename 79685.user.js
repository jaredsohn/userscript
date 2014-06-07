// ==UserScript==
// @name           VGchartz skip ad
// @namespace      http://www.andydremeaux.com
// @include        http://*vgchartz.com/interstitial*
// ==/UserScript==

var link = document.getElementsByTagName('a')[0].href;
window.location.href = link;