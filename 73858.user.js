// ==UserScript==
// @name           DAE Remover
// @namespace      flashtastic
// @include        http://www.reddit.com/*
// @include        https://www.reddit.com/*
// ==/UserScript==

var DAE_variants = new Array(
	'dae',
	'cae',
	'hae',
	'does anyone else',
	'does anybody else',
	'does anyone remember',
	'does anybody remember',
	'anyone else',
	'anybody else',
	'who else',
	'did anyone',
	'do any of you',
        'anyone ever'
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
	for ( j in DAE_variants ) {
		if ( ref.indexOf(DAE_variants[j]) >= 0 ) {
			if(String(link.parentNode.parentNode.parentNode.getAttribute("class")).indexOf("thing")!=-1){
			    link.parentNode.parentNode.parentNode.style.display = 'none';
			}
		}
	}
}