// ==UserScript==
// @name           Amazon.com to amazon.fr book link (by ISBN)
// @namespace      http://goelette.net/
// @description    Adds a link to the same book on amazon.fr
// @include        http://www.amazon.com/*
// ==/UserScript==

/* 
 * Updated April, 19 2012 for the new Amazon.com layout.
 */


var isbn;

// Match ISBN: 9 digits with a [0-9X] checksum
if (isbn = document.URL.match('/(\\d+[0-9X])/')[1]) {

    // Locate the Help section to insert new link
    var navHelpLinks = document.getElementById("nav-cross-shop-links")

    // Add a list element
    var li = document.createElement("li");
    li.setAttribute("class", "nav-xs-link");

    // Create link element
    var a = document.createElement("a");
    a.appendChild(document.createTextNode("See on Amazon.fr"));
    a.setAttribute("href", "http://www.amazon.fr/dp/" + isbn);
    a.setAttribute("class", "nav_a")
    li.appendChild(a);

    // Insert in document
    navHelpLinks.appendChild(li);
}
