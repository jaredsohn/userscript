// ==UserScript==
// @name           Cepat[dot]us Smiley for Facebook by Blackcrispy
// @icon           http://fc02.deviantart.net/fs71/f/2010/331/4/e/darth_vader_icon_64x64_by_geo_almighty-d33pmvd.png
// @namespace      Cepat Us Emoticon
// @description    Emot Update Status, Wall dan Chat Facebook
// @require        http://userscripts.org/scripts/source/103498.user.js
// @include        http://www.facebook.com/*
// @include        http://apps.facebook.com/*
// @version        1.0.2
// ==/UserScript==

var viewLogButton = document.createElement("div");viewLogButton.innerHTML="<a href=\"#\" onclick=\"window.open('http://www4.cbox.ws/box/?boxid=4057747&boxtag=znlqwn&sec=smilies','popup','width=500,height=500,scrollbars=yes,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=100,top=60'); return false\"><img src=\"http://fc02.deviantart.net/fs71/f/2010/331/4/e/darth_vader_icon_64x64_by_geo_almighty-d33pmvd.png\" border=\"0\"/></a>";viewLogButton.setAttribute("style", "position: fixed; right: 0px; top: 100px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");document.body.appendChild(viewLogButton);window=unsafeWindow;document=window.document;
replaceElement(document, yemo);
function listen(evt){
var node = evt.target;if (node.nodeType == document.ELEMENT_NODE) replaceElement(node, yemo); if (node.nodeType == document.TEXT_NODE) {var parent = node.parentNode;var span = replaceTextNode(node, yemo);if (span) parent.replaceChild(span, node);}}document.body.addEventListener('DOMNodeInserted', listen, true);