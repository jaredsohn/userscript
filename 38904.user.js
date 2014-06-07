// ==UserScript==
// @name          Clean WoW-Forums
// @namespace	  http://userscripts.org/scripts/show/38904
// @description   Removes the WoW-Forum Ads
// @include       http://forums.wow-europe.com/*
// @include       http://forums.worldofwarcraft.com/*
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

var targetElements = getElementsByClass('advertise-vert', document, 'div');
if (targetElemtens) {
  for (i = 0; i < targetElements.length; i++) {
      targetElements[i] = targetElements[i].parentNode;
      targetElements[i].parentNode.removeChild(targetElements[i]);
  }
}

targetElements = getElementsByClass('advertise-horz', document, 'div');
if (targetElemtens) {
  for (i = 0; i < targetElements.length; i++) {
      targetElements[i] = targetElements[i].parentNode;
      targetElements[i].parentNode.removeChild(targetElements[i]);
  }
}