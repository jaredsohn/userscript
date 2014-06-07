// ==UserScript==
// @name           SSW Bounty Sorter
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Sorts bounties from the Imperial Bounty Device.  Players in space are shown at the top.
// @include        http://www.secretsocietywars.com/index.php?p=inventory&a=bounty_tracker*
// @include        http://www.secretsocietywars.com/index.php?p=inventory&a=use
// ==/UserScript==

var cell = document.evaluate('//text()[contains(., "Outstanding Bounties")]/ancestor::td[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if(cell) {
	var firstlink = document.evaluate('//a[contains(@href, "a=bounty_tracker&track_bounty=")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var spacelinks = document.evaluate('//text()[contains(., "[In Space]")]/preceding-sibling::a[1]', cell, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for(var i = 0; i < spacelinks.snapshotLength; i++) {
		move_linkset(spacelinks.snapshotItem(i), firstlink);
	}
}

function move_linkset(link, destination) {
	var span = document.createElement('span');
	var nodes = new Array();
	var elem;
	destination.parentNode.insertBefore(span, destination);
	nodes.push(link);
	elem = link;
	while(elem = elem.nextSibling) {
		nodes.push(elem);
		if(elem.nodeName == 'BR') {
			break;
		}
	}
	for(var i = 0; i < nodes.length; i++) {
		span.appendChild(nodes[i]);
	}
}
