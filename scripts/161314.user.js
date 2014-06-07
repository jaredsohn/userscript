// ==UserScript==
// @name        Hide DN Plus on DN.se
// @namespace   http://userscripts.org/users/121410
// @version     0.1.1
// @description Hide DN Plus content
// @include     http://www.dn.se/*
// ==/UserScript==

function elementContainsOnlyShit(element)
{
    return !element.querySelector("a.Standard, a.section");
}

function findElementOfShit(element) 
{
    var parentElement = element.parentNode;
    if (elementContainsOnlyShit(parentElement)) {
        return findElementOfShit(parentElement);
    } else {
        return element;
    }
}

var shitLink;
while (shitLink = document.querySelector("a.Premium")) {
    var element = findElementOfShit(shitLink);
    element.parentNode.removeChild(element);
}