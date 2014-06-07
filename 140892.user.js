// ==UserScript==
// @name           Skip Warning Link eRepublik
// @description    Does warning link in eRep really pissing you off? Here is really small script that redirects itself.
// @namespace      eRepublik.com
// @include        *.erepublik.com/*/main/warn*
// @version        0.1beta
// ==/UserScript==

start();
function start() {
    
        unsafeWindow.location.href = document.getElementsByTagName('a')[3].getAttribute('href');
    
};

