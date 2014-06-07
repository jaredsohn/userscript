// ==UserScript==
// @name           Scumbag remover
// @namespace      flashtastic (edited by fingernails)
// @include        http://www.reddit.com/*
// @include        https://www.reddit.com/*
// ==/UserScript==

var SCUM_variants = new Array(
	'scumbag steve',
	'scumbag',
        'scum bag'
	);

// Page links
// From: http://diveintogreasemonkey.org/patterns/match-attribute.html
var links = document.evaluate(
	'//a[@href]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	
	

// Iterate through anchors.
for ( var i = 0; i < links.snapshotLength; i++ ) {
	link = links.snapshotItem( i );
	var ref = new String(link.innerHTML);
	ref = ref.toLowerCase();
	for ( j in SCUM_variants ) {
		if ( ref.indexOf(SCUM_variants[j]) >= 0 ) {
			if(String(link.parentNode.parentNode.parentNode.getAttribute("class")).indexOf("thing")!=-1){
			    link.parentNode.parentNode.parentNode.style.display = 'none';
			}
		}
	}
}