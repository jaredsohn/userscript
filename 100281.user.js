// ==UserScript==
// @name           Kaskus Smiley for Social Network
// @icon           http://bangneo.co.cc/userscripts/kasicon.png
// @namespace      Kaskus Emoticon
// @description    smiley kaskus for social network
// @require        http://userscripts.org/scripts/source/100277.user.js
// @include        http://*.facebook.com/*
// @include        http://twitter.com/*
// @version        1.4
// ==/UserScript==

var viewLogButton = document.createElement("div");viewLogButton.innerHTML="<a href=\"#\" onclick=\"window.open('http://www.kaskus.us/misc.php?do=getsmilies','popup','width=500,height=500,scrollbars=yes,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=100,top=60'); return false\"><img src=\"http://bangneo.co.cc/userscripts/button.jpg \" border=\"0\"/></a>";viewLogButton.setAttribute("style", "position: fixed; right: 0px; top: 300px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");document.body.appendChild(viewLogButton);window=unsafeWindow;document=window.document;
replaceElement(document, yemo);
function listen(evt){
var node = evt.target;if (node.nodeType == document.ELEMENT_NODE) replaceElement(node, yemo); if (node.nodeType == document.TEXT_NODE) {var parent = node.parentNode;var span = replaceTextNode(node, yemo);if (span) parent.replaceChild(span, node);}}document.body.addEventListener('DOMNodeInserted', listen, true);