// ==UserScript==
// @name          Helgon.net de-JavaScript guestbook links
// @namespace     http://henrik.nyh.se
// @description   Make JavaScripted links in Helgon.net guestbooks into regular links, to enable opening in new tabs and such. Modified by ZaInT.
// @include       http://*helgon.net/guestbook/guestbook.aspx*
// ==/UserScript==

function xp(query, root) { return document.evaluate(query, root || document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }
function with_each(query, cb, root) {
	var results = xp(query, root);
	for (var i = 0, j = results.snapshotLength; i < j; i++)
		cb(results.snapshotItem(i));
}

with_each("//a[starts-with(@href, 'javascript:')]", function(a) {
	
	a.href = a.href.replace(/javascript:(\w)\((\d+),(?:'?(.+?)'?,)?(\d+)\);/, de_jsify);
	
	function de_jsify(entire_href, funk, arg1, arg2, arg3) {
		switch (funk) {
			case "S":
				return 'javascript:Popup(\'quickmessage.aspx?UserID=' + arg1 + '&UserName=' + arg2 + '&GuestBookID=' + arg3 + '\',\'' + arg2 + '\')';
			case "H":
				return 'history.aspx?ID=' + arg1 + '&GuestBookID=' + arg2 + '&NoReply=' + arg3;
			case "G":
				return 'guestbook.aspx?ID=' + arg1 + '&GuestBookID=' + arg3;
			case "M":
				return 'markreply.aspx?ID=' + arg1 + '&action=mark&Page=' + arg2 + '&NoReply=' + arg3;
			default:
				return entire_href;
		}
	}

});

