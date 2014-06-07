// ==UserScript==
// @name        Wikipedia Header Links
// @namespace   None
// @description Add links to headers on wikipedia(and other wiki) pages
// @include     /^https?://.*\.wikipedia\.org/wiki/.*/
// @include     /^https?://.*\.wikia\.com/wiki/.*/
// @include     http://wiki.*
// @version     1.0.3
// ==/UserScript==


function addLinkToHeaders(headersClass)
{
    var headers = document.getElementsByClassName(headersClass);

    for (i in headers) {
        var header = headers[i];
        var link = document.createElement('a');
        link.href = '#' + header.id;
        link.textContent = ' ¶';
        link.style.color = '#ff00cc';
        // add the link
        header.parentNode.appendChild(link);
    }
}

addLinkToHeaders('mw-headline');
