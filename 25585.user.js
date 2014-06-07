// ==UserScript==
// @author         Caio Guimarães
// @version        1.0
// @email          guirica@uol.com.br
// @name           sxc.hu (stock.xchng) Cleaner
// @description    This script cleans the site www.sxc.hu by removing the follow advertising items: 1) Banners (left small banner and top big banner); 2) Premium Row (caption and thumbs); 3) Text links.
// @include        http://www.sxc.hu/*
// ==/UserScript==

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

function getNextSibling(startBrother){
  endBrother=startBrother.nextSibling;
  while(endBrother.nodeType!=1){
    endBrother = endBrother.nextSibling;
  }
  return endBrother;
}

bigBanner = document.getElementById("ads1");
bigBanner.style.display = "none";

smallBanner = getElementsByClass("bann", document, "div");
smallBanner[0].style.display = "none";

textLinks = document.getElementById('textlinks');
textLinks.style.display = "none";

premiumCaption = getElementsByClass("wb", document, "div");
premiumCaption[0].style.display = "none";

premium_spacer = getNextSibling(premiumCaption[0]);

if (premium_spacer.getAttribute("class") == "wbs"){
	premium_spacer.style.display = "none";
}

thumbRows = getElementsByClass("thumb_row", document, "div");
premiumRow = thumbRows[(thumbRows.length - 1)];
premiumRow.style.display = "none";