// ==UserScript==
// @name       Twitter Connect URL
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @include        http*
// @exclude        http*//*.twitter.*/*
// @copyright  2013, Oguzcan Sahin
// ==/UserScript==

document.getElementsByAttribute = Element.prototype.getElementsByAttribute = function(attr) {
    var matches = [],
        elements = this.getElementsByTagName('*');
    for (var i = 0; i < elements.length; i++) {
        if ( elements[i].getAttribute(attr) ) matches.push(elements[i]);
    }
    return matches;
};

document.getElementsByAttribute('data-nav')[1].setAttribute("href", "i/connect");