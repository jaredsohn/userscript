// ==UserScript==
// @name           Facebook smiley Prelemurian
// @namespace      http://www.downloadgamesgg.blogspot.com
// @description    Facebook Emoticon Prelemurian
// @require        http://userscripts.org/scripts/source/72023.user.js
// @include        http://www.facebook.com/*
// @include        http://apps.facebook.com/*
// @include        http://www.kaskus.us/*
// @version        1.7
// ==/UserScript==
var viewLogButton = document.createElement("div");viewLogButton.innerHTML="<a href=\"#\" onclick=\"window.open('http://prelemurian.alldiscussion.net/post?mode=smilies_chatbox','popup','width=500,height=500,scrollbars=yes,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=100,top=60'); return false\"><img src=\"http://r23.imgfast.net/users/2314/22/63/82/smiles/2371635618.gif/" border=\"0\"/></a>";viewLogButton.setAttribute("style", "position: fixed; left: 0px; bottom: -2px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");document.body.appendChild(viewLogButton);window=unsafeWindow;document=window.document;
replaceElement(document, yemo);
function listen(evt){
var node = evt.target;if (node.nodeType == document.ELEMENT_NODE) replaceElement(node, yemo); if (node.nodeType == document.TEXT_NODE) {var parent = node.parentNode;var span = replaceTextNode(node, yemo);if (span) parent.replaceChild(span, node);}}document.body.addEventListener('DOMNodeInserted', listen, true);
