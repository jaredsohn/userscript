// ==UserScript==
// @name           Fark Go Link Fixer
// @namespace      http://localhost/
// @include        http://www.fark.com/*
// ==/UserScript==

for (i=0; i< document.links.length; i++) {
    var s = document.links[i].href;
    if( s.indexOf("http://go.fark.com/cgi/fark/go.pl?i=") !== -1 ) {
        document.links[i].href = unescape( s.substr( s.indexOf("&l=") + 3 ) );
    }
}
