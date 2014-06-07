// ==UserScript==
// @name        TPB Reactivator
// @namespace   CSTech.Net.TPBActivator
// @description Get back on thepiratebay without any hassle!
// @include     *.*
// @version     0.27
// @grant metadata
// ==/UserScript==

var els = document.getElementsByTagName('a'),
        len = els.length;
while( len-- ) {
        els[len].hostname = els[len].hostname.replace('thepiratebay.se','tpb.pirateparty.org.uk');
}