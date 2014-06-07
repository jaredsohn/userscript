// ==UserScript==
// @name        Free Books Link Replace
// @namespace   www.seriousbrew.co.uk/scripts/
// @description one hundred freee books, changing links to .co.uk from .com
// @include     http://onehundredfreebooks.com/* 
// @version     6.0
// @grant       none
// ==/UserScript==

document.addEventListener("DOMContentLoaded", replaceLinks, false);

if( document.readyState === "complete" ) {
    replaceLinks();
}

function replaceLinks() {
    Array.forEach( document.links, function(a) {
        a.href = a.href.replace( "amazon.com", "amazon.co.uk" );
		a.href = a.href.replace( "tag%3D100freebooks-20", "tag%3D100freebooksinuk-21" );
    });
}
