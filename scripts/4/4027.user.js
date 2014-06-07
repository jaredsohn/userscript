// Google Search Box AccessKey user script
//
// ==UserScript==
// @name          Google Search Box AccessKey
// @description   Adds "s" as an access key for the search box on google
// @include       http://*.google.com*
// ==/UserScript==

// Adding an accessKey to the input box doesn't work because of a 
// bug in FireFox (290801).  Instead, create a label for the input box, and 
// assign an accessKey to the label.

// Give the edit box an id for the label to refer to
document.forms[0].elements.namedItem("q").setAttribute("id", "q");

// Create the label
var newLabel = document.createElement("label");
newLabel.setAttribute("for", "q");
newLabel.setAttribute("accessKey", "s");
newLabel.setAttribute("title", "Modify search text");

// Add the label to the form
document.forms[0].appendChild(newLabel);
