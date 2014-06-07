// ==UserScript==
// @name           Facebook Ad Fixer
// @namespace      John Richards
// @description    Removes ads from Facebook
// @include        http://*.facebook.com/*
// ==/UserScript==

//remove parent content
removeContent('ssponsor');

//removes child content as well
function removeContent(id) {

var node = document.getElementById(id);

if (node) {
       node.parentNode.removeChild(node);
       node = null;
   }
 }