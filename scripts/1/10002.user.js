// ==UserScript==
// @name            Distractions
// @description	    This script makes some wordpress blog look less silly, which is like making a sandwich that tastes better than cardboard. Feel free to edit it and make your own skins.
// ==/UserScript==

var result;

/* The big ass headline */
document.evaluate("//h1", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.setAttribute('style', "color: yellow;background-color: red;");

/* Text */
result = document.evaluate("//p", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i=0; i < result.snapshotLength; i++)
    result.snapshotItem(i).setAttribute('style', "color: yellow;");

/* List on the side */
result = document.evaluate("//li", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i=0; i < result.snapshotLength; i++)
    result.snapshotItem(i).setAttribute('style', "color: white");

/* Block Quotes */
result = document.evaluate("//blockquote", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i=0; i < result.snapshotLength; i++)
    result.snapshotItem(i).setAttribute('style', "background-color: #000099;");

/* Line Quotes */
result = document.evaluate("//Q", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i=0; i < result.snapshotLength; i++)
    result.snapshotItem(i).setAttribute('style', "color: red;");

/* Titles */
result = document.evaluate("//h3", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i=0; i < result.snapshotLength; i++)
    result.snapshotItem(i).setAttribute('style', "background-color: yellow;");

/* Body */
result = document.evaluate("//body", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i=0; i < result.snapshotLength; i++)
    result.snapshotItem(i).setAttribute('style', "background-color: blue;");

/* Links */
result = document.evaluate("//a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i=0; i < result.snapshotLength; i++)
    result.snapshotItem(i).setAttribute('style', "color: red;");

/* Search input */
document.getElementById('s').setAttribute('style', "color: red;background-color: yellow;");

/* Comment submit button */
document.getElementById('submit').setAttribute('style', "color: blue;background-color: yellow;");

/* Comment name field */
document.getElementById('author').setAttribute('style', "color: white;background-color: #9999FF;");

/* Comment email field */
document.getElementById('email').setAttribute('style', "color: white;background-color: #5555DD;");

/* Comment site field */
document.getElementById('url').setAttribute('style', "color: white;background-color: #3333BB;");

/* Comment textarea */
document.getElementById('comment').setAttribute('style', "color: white;background-color: black;");

/* The links below */
document.getElementById('links').setAttribute('style', "color: white;background-color: red;");


