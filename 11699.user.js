// ==UserScript==
// @name        NoFollow 2.0
// @namespace   http://userscripts.org/users/33089
// @description	Nothing fancy, just highlights all of the nofollow links ...
// @description	Both on a page wide or individual basis
// @description	Rewrote it from scratch using XPath
// @include	*
// ==/UserScript==

//Setting up the variables for our link style
var linkColor		= "#000000";
var linkBackGround	= "#ffbbbb";

//Setting up the link variables
var someLinks, thisLink, allLinks;

//Executing the first XPath Query
allLinks = document.evaluate(
	"//meta[@name=\"robots\"]/@content",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
);

//If XPath returns one result and that result contains the evil nofollow
if(allLinks.snapshotLength == 1 && allLinks.snapshotItem(0).value.match("nofollow")) {
	
	//Executing the Xpath Query to get all links
	allLinks = document.evaluate(
		"//a[@href]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	
	//Highlighting all of the links
	for (var i = 0; i < allLinks.snapshotLength; i++) {
	    thisLink = allLinks.snapshotItem(i);
		thisLink.style.color=linkColor;
		thisLink.style.background=linkBackGround;
	}
}else{
	
	//Executing the Xpath Query to get only the 
	//links with the rel='nofollow' ...
	someLinks = document.evaluate(
		"//a[@rel='nofollow']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	
	//Highlighting only the links with the rel='nofollow'
	for (var i = 0; i < someLinks.snapshotLength; i++) {
	    thisLink = someLinks.snapshotItem(i);
		thisLink.style.color=linkColor;
		thisLink.style.background=linkBackGround;
	}
}