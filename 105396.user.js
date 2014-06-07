// ==UserScript==
// @name 		   BSCF : move page under banner
// @namespace	   http://supportforums.blackberry.com/
// @description	version 1
// @include		http://supportforums.blackberry.com/*
// ==/UserScript==

if (-1 == document.URL.indexOf('#') ) {
	var aXDX = document.createElement('a'); aXDX.name = "nobanner";
	document.evaluate( "//ul[@id='list']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0).parentNode.appendChild(aXDX);
	window.location.hash = 'nobanner';
}