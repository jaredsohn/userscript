// ==UserScript==
// @name           Links
// @namespace      Derbi_Gaber
// @include        http://*2stroke-tuning.com/moped-forum/*
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

var i;
var links;
var a;

var l2=getElementsByClass('post_body');

for(i=0;i<l2.length;i++)
{

links=l2[i].getElementsByTagName('a');

for(a=0;a<links.length;a++)
{
links[a].setAttribute('target','_blank');
}
}