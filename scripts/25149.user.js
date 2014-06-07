//########################################################################
// Tapuz2008 Enhancer
// Rename this file to Tapuz2008Enhancer.user.js
//
// Version 0.04
// See userscripts.org page for full description and changelog.
// Switches between the right and left columns of the new tapuz site
// now in non-forum pages (my messages,last hour, new message) pages as well.
// last updated Mon Apr 14 2008
//
// Written by: Matan Ninio
// based on Haaretz Enhancer by Lior Zur, 2007
// Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)
// If you reuse parts of the code, please give credit. Thanks.
// Improvements & suggestions are welcome.
//
//########################################################################
// ==UserScript==
// @name           Tapuz2008 Enhancer
// @namespace      Matan
// @description    Improves Tapuz's new site by exchanging the order of the columns
// @include        http://www.tapuz.co.il/forums2008/*
// ==/UserScript==

var currentURL = location.href;
var allElements, thisElement, newElement;
var f;
var someHTML;

var reIsForum = /^http:\/\/www\.tapuz\.co\.il\/Forums2008\/ForumPage/;
var isMainForumPage = (reIsForum.test(currentURL));



// ==== Functions ====

function $(id) {
	return document.getElementById(id);
}

function $x(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

function removeElements (xPath) {
	var thisElement, allElements = document.evaluate(xPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (f = 0; f < allElements.snapshotLength; f++) {
		thisElement = allElements.snapshotItem(f);
		thisElement.parentNode.removeChild(thisElement);
	}
	if (allElements.snapshotLength > 0) return true; 
	else return false;
}
function insertAfter(newNode, node) {
  return node.parentNode.insertBefore(newNode, node.nextSibling);
}

// ==== End Functions ====



if (isMainForumPage) {
	var rightElement, leftElement;
	var rightStyle, leftStyle;
	var leftWidth;
	
	allElements= $x("//div[@class='rightSidePage']");
	rightElement = allElements[0]; // the right column
	allElements= $x("//div[@class='leftSidePage']"); 
	leftElement = allElements[0]; // the left column
	
	leftStyle=getComputedStyle(leftElement,'');
	rightStyle=getComputedStyle(rightElement,'');
	
	leftWidth=parseInt(leftStyle.width);
	

	leftElement.style.marginLeft=leftStyle.marginRight;
	leftElement.style.marginRight=rightStyle.marginRight;
	rightElement.style.marginRight=(leftWidth+10)+"px";
}
if (!isMainForumPage) {
	allElements=$('aspnetForm').childNodes;
	for (i=0;i<allElements.length;i++) {
		if (allElements[i].nodeName=="TABLE") {
			allElements[i].style.direction = 'LTR';
			allElements[i].lastChild.firstChild.style.direction = 'RTL';
		}
			
	}
}