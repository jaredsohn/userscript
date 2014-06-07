// ==UserScript==
// @name           Facebook Emoticon
// @namespace      http://www.udhy.50webs.com
// @description    Emoticon Yahoo and Kaskus for Status, wall and chat Facebook
// @require        http://userscripts.org/scripts/source/77178.user.js
// @include        http://www.facebook.com/*
// @version        1.4
// ==/UserScript==

var viewLogButton = document.createElement("div");

viewLogButton.innerHTML="<a href=\"***Klik untuk membuka Help***\" onclick=\"window.open('http://www.kaskus.us/misc.php?do=getsmilies&editorid=vB_Editor_001','popup','width=500,height=500,scrollbars=yes,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=100,top=80'); return false\"><img src=\"http://upload.wikimedia.org/wikipedia/en/3/3e/Kaskus_logo.png\" border=\"0\"/></a>";

viewLogButton.setAttribute("style", "position: fixed; right: -5px; top: 210px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
document.body.appendChild(viewLogButton);

window=unsafeWindow;
document=window.document;

replaceElement(document, yemo);

function listen(evt)
{
	var node = evt.target;
	if (node.nodeType == document.ELEMENT_NODE) 
		replaceElement(node, yemo);
	
	if (node.nodeType == document.TEXT_NODE) {
		var parent = node.parentNode;
		var span = replaceTextNode(node, yemo);
		if (span) 
			parent.replaceChild(span, node);
	}
}		

document.body.addEventListener('DOMNodeInserted', listen, true);