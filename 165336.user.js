// ==UserScript==
// @name       Canal+ remove ads
// @version    0.1
// @description  remove ads
// @include    http://www.canalplus.fr/*
// @copyright  2011+, lolo888
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
function removeElement(id) {
  var element = getElementsByClass(id);
  element.parentNode.removeChild(element);
}
function removeElementId(id) {
  var element = document.getElementById(id);
  element.parentNode.removeChild(element);
}
removeElementId('idpublicitepave');

//var banner = getElementsByClass('banner');
//alert(banner);
//banner.removeChild(banner);

GM_addStyle(".banner, .socialShareMore, .vitrineExtrude, .videoLive-content-tab { visibility: hidden; display: none !important; }");