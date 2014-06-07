// ==UserScript==
// @name           DeviantArt thumbnail as favicon
// @namespace      http://henrik.nyh.se
// @description    Sets a thumbnail of the gallery item as the favicon for the deviation page. If used together with my DeviantArt title fixer script, you might want to uncomment the line for a shorter prefix (added recently), in that script.
// @include        http://www.deviantart.com/deviation/*
// @include        http://www.deviantart.com/view/*
// ==/UserScript==

function xps(query, root) { return document.evaluate(query, root || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue; }


// Extract image location

var img = xps("//span[starts-with(@id, 'zoomed')][1]//img");
if (!img) return;

// Set as favicon

var link = document.createElement('link');
link.setAttribute('rel', 'shortcut icon');
link.setAttribute('href', img.src);

var head = document.getElementsByTagName('head')[0];
head.appendChild(link);

