// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Remove Ambrosia", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Remove Ambrosia
// @include       http://s*.en.ikariam.com/*
// ==/UserScript==

function getElementsByClass(node,searchClass,tag) {
    var classElements = new Array();
    var els = node.getElementsByTagName(tag); // use "*" for all elements
    var pattern = new RegExp('\\b'+searchClass+'\\b');
    for (var i = 0; i < els.length; i++)
         if ( pattern.test(els[i].className) )
             classElements[classElements.length] = els[i];
    return classElements;
}

var myEls = getElementsByClass(document,'ambrosia', 'li');
var childNode = myEls[0];
childNode.parentNode.removeChild(childNode);
