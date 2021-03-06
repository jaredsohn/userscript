// ==UserScript==
// @name           SquirrelMail display unread count in title
// @namespace      http://henrik.nyh.se
// @description    Display the number of unread mails first in the SquirrelMail window title. Rewrite of an idea by Johannes la Poutre: http://userscripts.org/scripts/show/6752.
// @include        http*/src/left_main.php
// ==/UserScript==


var unseen = $x("(//span/small)[1]");

var isCount = unseen[0] && unseen[0].innerHTML.match(/\(\d+\)/);
var mailCount = isCount ? unseen[0].innerHTML.replace(/<.*?>/g, '') + ' ' : '';

top.document.title = top.document.title.replace(/^(\(\d+\) )?/, mailCount);


/* Staple functions */

function $x(path, root) {
	if (!root) root = document;
	var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}
