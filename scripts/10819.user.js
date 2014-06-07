// ==UserScript==
// @name           Background Black - Blackle idea in GreaseMonkey!
// @namespace      http://daniel.scapin.googlepages.com
// @description    Change background color of some pages to black (mainly google) to save energy. Idea from http://www.blackle.com/about/.
// @include        http://www.google.com*
// ==/UserScript==


(function() {
    window.document.bgColor="000000"
    window.document.fgColor="000000"
    window.document.linkColor="AAAAAA"
    window.document.vlinkColor="777777"
})();
