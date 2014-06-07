// ==UserScript==
// @name           Clubbing KL Smiley for Facebook by Sokpinter
// @icon           http://i948.photobucket.com/albums/ad324/sokpinter/KLsmiley.jpg
// @namespace      Clubbing KL Emoticon
// @description    Smiley Clubbing KL untuk Update Status, Wall dan Chat Facebook
// @require        http://userscripts.org/scripts/source/103498.user.js
// @include        http://www.facebook.com/*
// @include        http://apps.facebook.com/*
// @version        1.0.2
// ==/UserScript==

var viewLogButton = document.createElement("div");viewLogButton.innerHTML="<a href=\"#\" onclick=\"window.open('http://clubbing.kapanlagi.com/misc.php?do=getsmilies','popup','width=500,height=500,scrollbars=yes,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=100,top=60'); return false\"><img src=\"http://i948.photobucket.com/albums/ad324/sokpinter/KLsmiley.jpg\" border=\"0\"/></a>";viewLogButton.setAttribute("style", "position: fixed; right: 0px; top: 100px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");document.body.appendChild(viewLogButton);window=unsafeWindow;document=window.document;
replaceElement(document, yemo);
function listen(evt){
var node = evt.target;if (node.nodeType == document.ELEMENT_NODE) replaceElement(node, yemo); if (node.nodeType == document.TEXT_NODE) {var parent = node.parentNode;var span = replaceTextNode(node, yemo);if (span) parent.replaceChild(span, node);}}document.body.addEventListener('DOMNodeInserted', listen, true);