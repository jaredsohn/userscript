// ==UserScript==
// @name           KillDwayneSpam
// @namespace      http://www.thisdoesntmatter.com
// @include        http://www.mopedarmy.com/forums/discuss/*
// ==/UserScript==

var linktolookfor = "http://www.mopedarmy.com/resources/mod/mightyducksrule/";
//alert('starting');

var links=document.getElementsByTagName("a");

for (x=0; x<links.length; x++) {
	if ( links[x] == linktolookfor ) {
//		alert('found it');
		links[x].parentNode.parentNode.parentNode.setAttribute("style","display:none;");
	}
}

//alert('ending');