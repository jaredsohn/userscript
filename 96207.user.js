// ==UserScript==
// @name           Show links with rel= attributes
// @namespace      http://nitrogenaudio.com/greasemonkey/nofollow01
// @include        *
// @description    This script uses DOM manipulation to highlight and display a list of links with a rel= attribute.
// ==/UserScript==

// By Mike Bourgeous
// I created this script while learning JavaScript.  This is
// the first JavaScript I've written, so it's undoubtedly ugly.  This script is
// released under CC-0/public domain, though I doubt it'll be of any use to
// anyone else.

// Accepts an A node from the DOM
// Returns a DOM node to append to the results list
function rel_element(node, attr)
{
	var url = '' + node;
	var content = attr.nodeValue;
	var el1 = document.createElement('p');
	var b = document.createElement('b');

	b.appendChild(document.createTextNode(url));
	el1.appendChild(b);
	el1.appendChild(document.createTextNode(': ' + content));

	return el1;
}

// Set up the overlay's style
var result = document.createElement('div');
var style = result.style;
style.backgroundColor = 'white';
style.color = 'black';
style.opacity = 0.8;
style.border = '1px solid red';
style.margin = '1em';
style.position = 'absolute';
style.zIndex = '10000';
style.minWidth = '5em';
style.maxWidth = '40em';
style.minHeight = '2em';
style.textAlign = 'left';
style.padding = '2px';
style.fontSize = '8pt';

// Set up the overlay's title
var title = document.createElement('span');
title.style.fontSize = '11pt';
title.appendChild(document.createTextNode('Links with rel= attributes (click to close)'));
result.appendChild(title);

// Can't set onclick directly -- will get NS_ERROR_NOT_AVAILABLE
//result.onclick = function() { alert('clicked'); }
result.addEventListener("click", function() { this.style.visibility = 'hidden'; }, true);

// It's probably possible to do this better with XPath or something
var links = document.getElementsByTagName('a');
for(i = 0, len = links.length; i < len; i++) {
	var node = links[i];
	var rel = node.attributes.getNamedItem('rel');
	if(rel != null) {
		node.style.backgroundColor = 'red';
		node.style.color = 'white';
		node.appendChild(document.createTextNode(' [' + rel.nodeValue + ']'));
		result.appendChild(rel_element(node, rel));
	}
}

// Prepend the results node to the body text
var bodyNode = document.getElementsByTagName('body')[0];
var firstNode = bodyNode.firstChild;

if(firstNode) {
	bodyNode.insertBefore(result, firstNode);
} else {
	bodyNode.appendChild(result);
}

