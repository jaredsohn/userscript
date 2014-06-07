// ==UserScript==
// @name       Ancap Web Replacer
// @namespace  http://reddit.com/u/myhonor
// @version    0.1
// @description  //
// @match      http*://*/*
// @copyright  Public Domain
// ==/UserScript==

walk(document.body);

function walk(node) 
{
	
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode) 
{
	var v = textNode.nodeValue;


	v = v.replace(/Taxation/g, "Theft");
	v = v.replace(/taxation/g, "theft");
    
	v = v.replace(/Taxes/g, "Thefts");
	v = v.replace(/taxes/g, "thefts");

	v = v.replace(/Tax/g, "Theft");
	v = v.replace(/tax/g, "theft");

	
	textNode.nodeValue = v;
}
