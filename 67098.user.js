// ==UserScript==
// @name      Using iframes in greasemonkey
// @namespace  http://userscripts.org/users/110447
// @description    A working example of how to use iframes in greasemonkey
// @version		   0.1
// @include        http://*userscripts*
// ==/UserScript==

// Get reference element for where you want to place the iframe element
var getRef = document.getElementById("content");

// Create new iframe
var makeIframe = document.createElement("iframe");

// Set the height with .setAttribute method
makeIframe.setAttribute("height", "150px");

// Set the width with .setAttribute method
makeIframe.setAttribute("width", "325px");

// Set the source location of iframe with .setAttribute method
makeIframe.setAttribute("src", "http://google.com");

// Use .insertBefore method to put newly created iframe above/before the reference element
var parentDiv = getRef.parentNode;
parentDiv.insertBefore(makeIframe, getRef);