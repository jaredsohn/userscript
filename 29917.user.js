// ==UserScript==
// @name           Bytes.com Formatting
// @namespace      http://userscripts.org/
// @description         Replaces [color=blue], etc, pseudo-makrup sometimes found on bytes.com with valid html and css that actually colors the page's text.
// @include        http://bytes.com/*
// ==/UserScript==

var elements = document.evaluate("//div", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < elements.snapshotLength; i++) 
{
	var thisElement = elements.snapshotItem(i);
	thisElement.innerHTML = thisElement.innerHTML.replace(/\[color=(.*?)\]/ig,"<span style='color:$1'>").replace(/\[\/color\]/ig,"</span>");
}
