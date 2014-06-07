// ==UserScript==
// @name        lj-ignore
// @namespace   http://beesbuzz.biz/code/gmscripts
// @description Ignore particular users on Livejournal comment threads
// @include     http://*.livejournal.com/*
// @version     1.01
// @grant none
// ==/UserScript==

var ignoredUsers = [];
console.log("suppressing bullshit users");

for (var i in ignoredUsers) {
	var user = ignoredUsers[i];
	console.log(user);
	var expr = "//a[@class='i-ljuser-username']//*[text()='" + user + "']";
	console.log("expr = " + expr);
	try {
		var comments = document.evaluate(expr, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		console.log(user + ": found " + comments.snapshotLength + " comments");
		for (var j = 0; j < comments.snapshotLength; j++) {
			var item = comments.snapshotItem(j);
			console.dir(item);
			while (item && (!item.id || item.id.substr(0,5) != "ljcmt")) {
				console.log("item id=" + item.id + " class=" + item.className);
				item = item.parentNode;
			}
			if (item) {
				item.style.display = 'none';
			}
		}
	} catch (e) { console.log(e); }
}
console.log("done suppressing bullshit");
