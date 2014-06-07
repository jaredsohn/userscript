// ==UserScript==
// @name        		Gorafi comment sorter
// @namespace   	Plop Corp
// @author   			Ginko Aloe
// @licence  			CC BY 3.0 - http://creativecommons.org/licenses/by/3.0/
// @description 		Sort Gorafi comment chronologically
// @include     		http://www.legorafi.fr/*
// @version     		1
// @grant       		none
// ==/UserScript==

// NB : I think this script should work on many wordpress-powered sites (since legorafi is one of them). Feel free to fork it, this work is under CC By.

function getNode(xpathStmt, node) {
	return document.evaluate( xpathStmt, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
}

// Get comment nodes
var ol = getNode("//ol[@class='commentlist']", document);
var li = ol.getElementsByClassName('depth-1');

// Build new comment list
var new_ol = document.createElement('ol');
new_ol.className = 'commentlist';
 
var parent = ol.parentNode;

// Copy list elements beginning from the last to the new list
for(var i=li.length - 1; i > 0 ; i--)    {
	new_ol.appendChild(li[i]);
 }
 
 // Inject the new list and remove the old one
parent.insertBefore(new_ol, ol);
parent.removeChild(ol)