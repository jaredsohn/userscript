// ==UserScript==
// @name 		   BSCF : replace 'Hall of Famer I' image by a 5-star one
// @namespace	   http://supportforums.blackberry.com/t5/
// @description	version 1
// @include		http://supportforums.blackberry.com/t5/*
// ==/UserScript==

var xPathRes = document.evaluate( "//img[@title = 'Hall of Famer I']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
for (var i=0;i<xPathRes.snapshotLength;i++) {
	xPathRes.snapshotItem(i).setAttribute('src','http://supportforums.blackberry.com/t5/image/serverpage/image-id/6887iE1A0B903C7165A8C');
}