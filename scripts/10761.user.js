// Slate Print Linker
// Copyright (c) 2007, Raking Leaves
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//
// ==UserScript==
// @name          Slate Print Linker
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Fixes Slate print links to open in same window
// @include       http://*.slate.com/id/*
// ==/UserScript==

// utility function, taken from web
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


function fixPrintLink(printLink) {
    // get the article id
    var idRegexp = /'print','(.*)'/;
    var theMatch = idRegexp.exec(printLink.href);
    if (theMatch != null) {
        var id = theMatch[1];
        printLink.href = "http://www.slate.com/toolbar.aspx?action=print&id=" + id;
    } else {
        // weird; didn't match
        // do nothing
    }
}

var leftPrintLinks = document.getElementById('print_link').parentNode.getElementsByTagName('A');

for (var i = 0; i < leftPrintLinks.length; i++) {
    fixPrintLink(leftPrintLinks[i]);
}

fixPrintLink(getElementsByClass('article_bottom_tools',null,null)[0].childNodes[0]);

