// ==UserScript==
// @name           bayu-cemment Smiley
// @namespace      http://www.bayu-cemment.com/
// @description    membuat Teks Biasa menjadi chibi-cyber Emote Di Facebook dengan tag default Chibi emote Bisa di pakai untuk chat ataupun wall
// @require        http://userscripts.org/scripts/source/131077.user.js
// @include        http://*.facebook.com/*
// @include        https://www.facebook.com/*
// @version        1.5
// @author         [C³]bayu-cemment


// ==/UserScript==

var viewLogButton = document.createElement("div");viewLogButton.innerHTML="<a href=\"#\" onclick=\"window.open('http://chibi-cyber.com/misc.php?action=smilies&popup=true&editor=clickableEditor','popup','width=500,height=500,scrollbars=yes,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=100,top=60'); return false\"><img src=\"http://chibi-cyber.com/images/dark/forest/on.gif\" border=\"0\"/></a>";viewLogButton.setAttribute("style", "position: fixed; left: 0px; bottom: +82px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");document.body.appendChild(viewLogButton);window=unsafeWindow;document=window.document;
replaceElement(document, yemo);
function listen(evt){
var node = evt.target;if (node.nodeType == document.ELEMENT_NODE) replaceElement(node, yemo); if (node.nodeType == document.TEXT_NODE) {var parent = node.parentNode;var span = replaceTextNode(node, yemo);if (span) parent.replaceChild(span, node);}}document.body.addEventListener('DOMNodeInserted', listen, true);

