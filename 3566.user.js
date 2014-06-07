// ==UserScript==
// @name          Gracenote Checks
// @description   displays a checkbox next to each song in Gracenote's album view
// @include       http://gracenote.com/music/*, http://www.gracenote.com/music/*
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

var items = getElementsByClass('num',document,'td');
for(var i = 0; i < items.length; i++){
   if(items[i].getElementsByTagName('b').length == 0){
      var x = "<input type=\"checkbox\">";
      items[i].innerHTML = items[i].innerHTML + " " + x;
   }
}