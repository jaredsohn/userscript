//
// ==UserScript==
// @name          Yahoo! Address Book - Linkify
// @namespace     http://userscripts.org/yahoo
// @description   This script links entries in Yahoo address book to Yahoo profiles. For address book entries linked to YIM profile/login (address book field "messenger ID"), this script adds a [Profile] link next to the [Edit] link in the list of addresses. When you click on an individual address book entry to view the entry summary card, this script will link the YIM id on the card to the owner's profile.
// @include       http://address.mail.yahoo.com/*
// @include	  http://address.yahoo.com/*
// ==/UserScript==


var nodes = document.evaluate(
	"//a[@href and starts-with(@href,'ymsgr')]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
    	    	
if (nodes.snapshotLength > 1) {

	for (var i=0;i<nodes.snapshotLength;i++) {

		var node = nodes.snapshotItem(i);
		var username = node.getAttribute('href').replace("ymsgr:sendIM?","");	
		
		var link = document.createElement('a');
		link.setAttribute('href','http://profiles.yahoo.com/' + username);
		link.innerHTML = "[Profile]";
			
		var span = document.createElement('span');
		span.setAttribute('class', 'actiontext');
		span.appendChild(link);	
	
		var parent = node.parentNode.parentNode.childNodes[7];
		parent.insertBefore(span,parent.childNodes[3].nextSibling);	
	}
}
else if (nodes.snapshotLength == 1) {
	
	var target = nodes.snapshotItem(0).parentNode;
	if (target) {	
		var username = target.textContent.replace(/^\s+|\s+$/g, "");
		var link = document.createElement('a');
		link.setAttribute('href','http://profiles.yahoo.com/' + username);
		link.innerHTML = " " + username;		
		target.replaceChild(link,target.childNodes[2]);
	}
}	