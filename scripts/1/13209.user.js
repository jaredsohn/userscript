// ==UserScript==
// @name		xpathexplorer
// @version		0.1
// @description		explore xpath on evolution
// @include		http://ev5.neondragon.net/*
// @author		podd
// ==/UserScript==

GM_log("XpathExplorer start");

const message_html = '<form action="" name="xpathtesting" onsubmit="return false;"><input type="text" name="xpathsubmit" value="" size="20"><P><a href="javascript:makepost();">makepost</a></form>';

unsafeWindow.makepost = function() {
GM_log("debug 1");
	var searchstring = document.forms.namedItem("xpathtesting").elements[0].value;
GM_log("debug 1");
	var headings = document.evaluate(searchstring, document, null, XPathResult.ANY_TYPE,null);
GM_log("debug 1");
	var thisHeading = headings.iterateNext();
GM_log("debug 1");
	var x = 0;
	var alertText = ""
GM_log("debug 1");
	
	while (thisHeading) {
		alertText += "array[" + x + "] = (" + thisHeading.textContent + ")<BR>"
		thisHeading = headings.iterateNext();
		x++;
	}
	message_cell.innerHTML = message_html + '<P>' + alertText;
	document.forms.namedItem("xpathtesting").elements[0].value = searchstring;
}

message_cell = document.createElement("div");
message_cell.innerHTML = message_html;

var nodes = document.evaluate('//p[@id="smallprint"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

// add content before first (&only?) title
node = nodes.snapshotItem(0);
// append
node.parentNode.insertBefore(message_cell, node.nextSibling);
GM_log("XpathExplorer end");
