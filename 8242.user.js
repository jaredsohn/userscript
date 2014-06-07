// ==UserScript==
// @name           YCFix
// @namespace      http://svallens.com/eric
// @description    fix YC flaws
// @include        http://news.ycombinator.com/*
// ==/UserScript==

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

var titles = getElementsByClass('title',null,'td');

for(var index = 0; index < titles.length; index++){
	thisElement = titles[index];
	if(thisElement.vAlign == 'middle'){
		// it's a real title
		row = thisElement.parentNode;
		imgNode = row.childNodes[1];
		if(imgNode.getElementsByTagName('a').length > 0){
		}
		else{
			row.parentNode.removeChild(row.nextSibling);
			row.parentNode.removeChild(row.nextSibling);
			row.parentNode.removeChild(row);
		}
	}
}