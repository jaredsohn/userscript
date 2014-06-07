// New York Magazine Print Linker
// Copyright (c) 2007, Raking Leaves
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//
// ==UserScript==
// @name          New York Magazine Print Linker
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Fixes New York Magazine print links to open in same window
// @include       http://*nymag.com/*
// ==/UserScript==

// get all the elements of a particular class
function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}


var partnerID = 73272;
var commonLoc = "&fb=Y&url="+escape(document.location.href)+"&title="+escape(document.title)+"&random="+Math.random()+"&partnerID="+partnerID+"&expire=";
var theURL = 'http://www.printthis.clickability.com/pt/printThis?clickMap=printThis'+commonLoc;
var printUL = getElementsByClass('tools',null,null)[0];
if (printUL != null) {
    var printLink = printUL.childNodes[3].childNodes[0];
    if (printLink != null) {
        printLink.setAttribute("onmouseout","");
        printLink.setAttribute("onmouseover","");
        printLink.setAttribute("onclick","");
        printLink.href = theURL;
    }
}
