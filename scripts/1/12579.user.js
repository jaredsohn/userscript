// ==UserScript==
// @name	Trac local redirector
// @namespace	http://www.ocharake.org/matobaa
// @include	http://10.68.24.232/trac/pmwb40/*
// @include	http://localhost/*
// ==/UserScript==

// to use local file link, add following to user.js:
// (if not existed, create new file):
//
// user_pref("capability.policy.policynames", "localfilelinks");
// user_pref("capability.policy.localfilelinks.sites", "http://10.68.24.232 http://localhost");
// user_pref("capability.policy.localfilelinks.checkloaduri.enabled", "allAccess");

(function() {
	var table = new Array();
	// TODO: comment here
	table["http://10.68.24.232/trac/pmwb40"] = "file://C:/Documents and Settings/matobaa/デスクトップ/PMWB作業用/";
	table["http://localhost/trac/Example"] = "file://C:/Workspace/example/";
	var tags = new Array();
	tags["http://10.68.24.232/trac/pmwb40"] = "";
	tags["http://localhost/trac/Example"] = "trunk";

	key = document.location.href.match(/.*\/trac\/[^/]*/);
	checkoutfolder = table[key];
	trimpath = "/browser/" + tags[key] + "/";

	var links = document.evaluate("//a[@href]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < links.snapshotLength; i++) {
		if(!links.snapshotItem(i).href.match(/\/browser\//)) continue;
		link = links.snapshotItem(i);
		href = link.href;
		linklocal = document.createElement("a");
		linklocal.href = checkoutfolder + href.substring(href.indexOf(trimpath)+trimpath.length);
		linklocal.appendChild(document.createTextNode("L"));
		link.parentNode.insertBefore(document.createTextNode("("),link);
		link.parentNode.insertBefore(linklocal,link);
		link.parentNode.insertBefore(document.createTextNode(") "),link);
	}
})();

// below lines are garbages
//		linklocalparent = document.createElement("a");
//		linklocalparent.href = linklocal.href.substring(0,linklocal.href.lastIndexOf('/'));
//		linklocalparent.appendChild(document.createTextNode("P"));
//		link.parentNode.insertBefore(linklocalparent,link);
//		link.parentNode.insertBefore(document.createTextNode(" "),link);
