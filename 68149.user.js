// ==UserScript==
// @name           JIRA Agile Color Override
// @namespace      http://userscripts.org/scripts/show/68149
// @description    Override the X-Mas colors
// @include        http://jira.atlassian.com/secure/VersionBoard.jspa*
// ==/UserScript==

function getElementsByClass( searchClass, domNode, tagName) {
	if (domNode == null) domNode = document;
	if (tagName == null) tagName = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) {
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1)
			el[j++] = tags[i];
	}
	return el;
}

var theResultsInfo = getElementsByClass('Bdgc');
for (x in theResultsInfo) {
	currentStyle = theResultsInfo[x].getAttribute('style');
	if (currentStyle == null) {
	    currentStyle = '';
	}
	theResultsInfo[x].setAttribute('style', currentStyle + ';background-color: rgb(180, 180, 180);');
}

theResultsInfo = getElementsByClass('card-body');
for (x in theResultsInfo) {
	currentStyle = theResultsInfo[x].getAttribute('style');
	if (currentStyle == null) {
	    currentStyle = '';
	}
	theResultsInfo[x].setAttribute('style', currentStyle + ';background-color: rgb(180, 180, 180);');
}

theResultsInfo = getElementsByClass('corner');
for (x in theResultsInfo) {
	currentStyle = theResultsInfo[x].getAttribute('style');
	if (currentStyle == null) {
	    currentStyle = '';
	}
	theResultsInfo[x].setAttribute('style', currentStyle + ';background-color: rgb(180, 180, 180);');
}

