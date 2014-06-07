// ==UserScript==
// @name           DeBing
// @namespace      adsfdanjgdgdf63465dfag65ag
// @description    Swap MSN.com's search for Google's
// @include        http://www.msn.com/
// ==/UserScript==

document.getElementById('srchfrm').action="http://www.google.com/search";
document.getElementsByName('FORM')[0].parentNode.removeChild(document.getElementsByName('FORM')[0]);