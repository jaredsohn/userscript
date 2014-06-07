// ==UserScript==
// @name           MFD Remover
// @namespace      http://userscripts.org/scripts/edit_src/29180
// @description    Removes MFD from thedailywtf.com
// @include        http://thedailywtf.com/*
// @include        http://www.thedailywtf.com/*
// ==/UserScript==

// Shamelessly ripped from: http://www.dustindiaz.com/getelementsbyclass/
function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

// Many lines of code I wrote myself. I suck at javascript. But I don't care, it works...
mfdouter = getElementsByClass('Mandatory_Fun_Day_Outer');
for(i = 0; i < mfdouter.length; i++)
  mfdouter[i].parentNode.style.display = 'none';