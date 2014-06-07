// ==UserScript==
// @name           Onion Detector
// @namespace      http://www.idunnolol.com
// @description    Gives you a heads-up if the link is an Onion article or not!  (Does not work for redirects, like tinyURL.)
// @include        *
// ==/UserScript==

(function() {
    var onionre = /^http:\/\/(www\.)?(the)?onion\.com/i;
    var links = document.getElementsByTagName('a');
    for (var a = 0; a < links.length; a++) {
        var link = links[a];
        if (link.href && onionre.test(link.href)) {
            link.innerHTML = link.innerHTML + " [ONION DETECTED]";
        }
    }
})();
