// ==UserScript==
// @name URL Protocol Fixer
// @namespace http://www.dennisgranau.com/greasemonkey
// @description This simple script fixes all links with incorrect/mistyped protocol section
// @include *
// @run-at document-end
// ==/UserScript==


function fixUrlProto() {
    var links = document.getElementsByTagName('a');
    for(var i=0; i < links.length; i++) {
        var link_href = links[i].href;
        if (link_href.match(/^htp:/)) {
            links[i].href = link_href.replace(/^htp:/, 'http:');
        }
    }
}

fixUrlProto();


