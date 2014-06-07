// ==UserScript==
// @name          jpopsuki adv. search: highlight stripper (titles only search version)
// @namespace     http://otterish.co.uk
// @description   strips the highlights off search pages (titles only search version)
// @version       0.1
// @include       http://mullemeck.serveftp.org*/jps_beta/*titlesonly=1*
// ==/UserScript==

(function(){

var allSpans, thisSpan;
allSpans = document.getElementsByTagName('span');
for (var i = 0; i < allElements.length; i++) {
    thisSpan = allSpans[i];
    if (thisSpan.style.backgroundColor == 'rgb(255, 255, 102)')
       thisSpan.style.backgroundColor = '';
}

})();