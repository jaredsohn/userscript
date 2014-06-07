// ==UserScript==
// @name           Numbered Google SERPs
// @namespace      ohitscompletelyobvious
// @description    Number the results in Google web search
// @include        http://www.google.com/search*
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


var re = new RegExp('start=(\\d+)') ;
var matches = re.exec(window.location.href) ;
var start = 1* ( matches ? matches[1] : 0 ) ;

var gg = getElementsByClass('g') ;

for( i=0,l=gg.length ; i<l ; i++ ){
	gg[i].innerHTML = (start+i+1)+" "+gg[i].innerHTML ;
}