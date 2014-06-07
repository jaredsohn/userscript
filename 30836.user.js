// When you're the owner of very many packages registered in the Python
// Package Index, the little box that lists all of them becomes a very
// big box, and it pushes the normal page content way down. This script
// collapses the box and adds a Javascript-powered (more)/(less) toggle.
//
// Written by Marius Gedminas <marius@gedmin.as>
//
// Version 0.2 (2008-08-26)
//
// ==UserScript==
// @name           PyPI small package list
// @description    Make the list of your packages smaller
// @namespace      http://gedmin.as/
// @include        http://pypi.python.org/*
// ==/UserScript==

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function list_of_packages() {
    var results = xpath('//div[@id="document-navigation"]/ul/li');
    if (results.snapshotLength < 1)
        return null;
    return results.snapshotItem(0);
}


var li = list_of_packages();
if (li.clientHeight > 70) {
    var pkglistshown = true;
    var newElement = document.createElement('li');
    var newLink = document.createElement('a');
    function pkglisttoggle(event) {
        li.style.overflow = 'hidden';
        if (pkglistshown) {
            pkglistshown = false;
            li.style.height = '5em';
            newLink.innerHTML = '(more)';
        } else {
            pkglistshown = true;
            li.style.height = 'auto';
            newLink.innerHTML = '(less)';
        }
    }
    unsafeWindow.pkglisttoggle = pkglisttoggle;
    newLink.href = 'javascript:pkglisttoggle()';
    newLink.innerHTML = '(loading)';
    newElement.appendChild(newLink);
    li.parentNode.insertBefore(newElement, li.nextSibling);
    pkglisttoggle();
}
