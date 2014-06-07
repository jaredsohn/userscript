// ==UserScript==
// @name           facebook.com
// @namespace      http://www.facebook.com
// @include        http://*.facebook.com/*
// ==/UserScript==

function getElementsByClass(node,searchClass,tag) {
	var classElements = new Array();
	var els = node.getElementsByTagName(tag); // use "*" for all elements
	var elsLen = els.length;
	var pattern = new RegExp("\\b"+searchClass+"\\b");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			var attr = document.createAttribute("style");
			els[i].setAttributeNode(attr);
			classElements[j] = els[i];
			classElements[j].setAttribute("style", "font-size:13px");
			j++;
		}
	}
	return classElements;
}

function execute() {
	var el = getElementsByClass(document,'comment_actual_text','*');
	alert(el.length);
}

execute()