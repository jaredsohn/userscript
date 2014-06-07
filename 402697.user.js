// ==UserScript==
// @name           Google Search Result Underliner - By RGSoftware (Ric Geraci)
// @description    Google Underliner
// @include        https://*.google.*
// @include        https://google.*
// @include        http://google.*
// @include        *://google.*
// @version        1.0
// ==/UserScript==

var elements = document.getElementsByClassName('r');
for (var i=0; i<elements.length; i++) {
elements[i].setAttribute('style', 'text-decoration: underline;');
}

