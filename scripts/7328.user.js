// ==UserScript==

// @name           LinkedIn Ad Remover
// @namespace      http://www.3greeneggs.com
// @description    Remove the flash advertisement from LinkedIn
// @include        *linkedin.com*

// ==/UserScript==

// remove first round of ads
var adframe = document.getElementsByTagName('iframe');
for(i=0;i<adframe.length;i++) {
    adframe[i].parentNode.removeChild(adframe[i]);
}

