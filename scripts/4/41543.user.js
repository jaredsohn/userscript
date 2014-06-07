// ==UserScript==
// @name URL Parser
// @author Veridis
// @namespace http://www.veridis.com/LinkParser
// @description Parses the page for URLs and turns them into links
// @license Creative Commons Attribution License
// @version 1.0
// @include *
// @released 2009-02-01
// @compatible Greasemonkey
// ==/UserScript==

var parseTextNode = function(textNode) {
	var match = re(textNode.data);
		
	if (match !== null) {		
		var rightTextNode = textNode.splitText(match.index);
		
		var url = rightTextNode.data.substr(0,match[0].length - match[1].length),
			span = document.createElement('a');
			span.innerHTML = url;
			span.href = url;
			
		rightTextNode.parentNode.insertBefore(span, rightTextNode);
		rightTextNode.data = rightTextNode.data.substr(match[0].length - match[1].length);
		parseTextNode(rightTextNode);
	}
}


var elems = Array.prototype.slice.call(document.body.getElementsByTagName('*')),
	re = /(?:mailto|http(?:s)?|ftp):(?:\/\/)?.+?((?:\.)?(?:\s|$))/i,
	elem,
	child;
	
while (elem = elems.shift()) {
	var children = Array.prototype.slice.call(elem.childNodes);
	while (child = children.shift()) {
		if (child.nodeType === unsafeWindow.Node.TEXT_NODE 
		&& child.parentNode.nodeName !== 'A'
		&& child.parentNode.nodeName !== 'TEXTAREA'
		&& child.parentNode.nodeName !== 'SCRIPT'
		&& child.parentNode.nodeName !== 'STYLE') {
			parseTextNode(child);
		}
	}
}