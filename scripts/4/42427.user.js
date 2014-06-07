// ==UserScript==
// @name Last.fm - Plonk user
// @namespace
// @description Adds link in user's profile to easily add user to your ignore list
// @include http://www.last.fm/user/*
// @include http://www.last.fm/settings/inboxoptions*
// @exclude http://www.last.fm/user/*/*
// ==/UserScript==

function xpath(query, context) {
	if (!context) { context = document; }
	return document.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
(function () {
if (location.href.match(/last[^\/]*\/user\//)) {
	var username = location.href.match(/last[^\/]*\/user\/([^\/]*)$/)[1];;
	var linkName = "http://www.last.fm/settings/inboxoptions?ignoreuser="+username;
	var insertText = "<LI><A HREF=\""+linkName+"\"><SPAN>Add user to ignorelist</SPAN></A></LI>";
	var spans = xpath("//div/div/ul/li/a/strong/span");
	if (spans.snapshotLength > 0) {
		for (var num=0; num<spans.snapshotLength; num++) {
			if (spans.snapshotItem(num).innerHTML.match(/Add as friend/)) {
				spans.snapshotItem(num).parentNode.parentNode.parentNode.parentNode.innerHTML += insertText;
				break;
			}
		}
	}
} else if (location.href.match(/\/settings\/inboxoptions.ignoreuser=./)) {
	var username = location.href.match(/ignoreuser=(.*)$/)[1];
	if (! username) { exit; }
	document.getElementById("ignoreuser").value=username;
}
}) ();