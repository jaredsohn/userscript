// ==UserScript==
// @name           Node Webmail Stripper
// @namespace      fremnet
// @description    Strips down the Webmail interface on Internode
// @include        https://webmail.internode.on.net/cgi-bin/*
// ==/UserScript==

function xpath(query, inwhat) {
	return document.evaluate(query, inwhat, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Auto-focus the login form
if (document.getElementsByName('user').length > 0) {
	document.getElementsByName('user')[0].focus();
	return
}

// Hide the container div
var wrapperDiv = xpath("//div[@class='PageNavContentAndMenus']", document.body).snapshotItem(0);
wrapperDiv.style.display = 'none';

// Move the content div to the body level
var contentDiv = xpath("//div[@class='Content']", document.body).snapshotItem(0);
document.body.appendChild(contentDiv);

// Resize the table
var emailTable = xpath("//table[@width='790']", contentDiv).snapshotItem(0);
if (emailTable) {
	emailTable.style.width="100%";
	var aQuery = xpath("//td[@class='cell-bg-1']/a", emailTable);

	// Expand the link titles
	for (var i = 0; i < aQuery.snapshotLength; i++) {
		var a = aQuery.snapshotItem(i);
		if (a.title) {
			a.innerHTML = a.title
		}
	}
}