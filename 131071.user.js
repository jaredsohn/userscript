// ==UserScript==
// @name           Chibi-Cyber Community Smiley
// @namespace      http://www.chibi-cyber.com/
// @description    membuat Teks Biasa menjadi chibi-cyber Emote Di Facebook dengan tag default Chibi emote Bisa di pakai untuk chat ataupun wall
// @require        http://userscripts.org/scripts/source/131077.user.js
// @include        http://*.facebook.com/*
// @include        http://twitter.com/*
// @version        1.6
// @author         [C³]Tapuy
// ==Credits==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+62px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"/j3p1.GaRis.KeRaS\">PeterJepiMars</a>"
	
	body.appendChild(div);
}
// ==============

// ==Forum==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+42px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://chibi-cyber.com/\">Chibi-Cyber Community</a>"
	
	body.appendChild(div);
}
// ==============

// ==Blog==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+22px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://peterjepimars.blogspot.com/\">My Blog</a>"
	
	body.appendChild(div);
}
// ==============

// ==/UserScript==

var viewLogButton = document.createElement("div");viewLogButton.innerHTML="<a href=\"#\" onclick=\"window.open('http://chibi-cyber.com/misc.php?action=smilies&popup=true&editor=clickableEditor','popup','width=500,height=500,scrollbars=yes,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=100,top=60'); return false\"><img src=\"http://chibi-cyber.com/images/dark/forest/on.gif\" border=\"0\"/></a>";viewLogButton.setAttribute("style", "position: fixed; left: 0px; bottom: +82px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");document.body.appendChild(viewLogButton);window=unsafeWindow;document=window.document;
replaceElement(document, yemo);
function listen(evt){
var node = evt.target;if (node.nodeType == document.ELEMENT_NODE) replaceElement(node, yemo); if (node.nodeType == document.TEXT_NODE) {var parent = node.parentNode;var span = replaceTextNode(node, yemo);if (span) parent.replaceChild(span, node);}}document.body.addEventListener('DOMNodeInserted', listen, true);

