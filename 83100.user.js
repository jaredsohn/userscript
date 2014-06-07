// ==UserScript==
// @name           Fresh out hide 
// @namespace      Vali202(fab_74) and fixed by blindmind
// @description    Hide prizes fresh out during lockerz redemption.
// @include        *ptzplace*
// @include        *redeem*
// ==/UserScript==

function getElementsByClass(searchClass, domNode, tagName) 
{
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

var FreshOut = getElementsByClass("productFrame pfs buynow");
for(i=0;i<=FreshOut.length;i++)
{
	FreshOut[i].style.display='none';
}