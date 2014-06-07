// ==UserScript==
// @name           IGN Boards: Show Old Threads
// @namespace      http://www.yabd.org/
// @description    Highlight old threads that have been bumped
// @include        http://boards.ign.com/teh_vestibule/b5296/p*
// @version        1.0
// ==/UserScript==

var posts = document.evaluate('//*[@class="boards_board_list_row_subject "]//a', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var mean = 0;
var nlinks = 0;
var links = new Array();
var subj = /b(?:\d)+\/(\d+)\/p1\/\?/
for (var i=0; i<posts.snapshotLength; i++) {
	var post = posts.snapshotItem(i);
	var match = subj.exec(post.href);
	if (match) {
		nlinks++;
		mean += parseInt(match[1]);
		links.push(match[1]);
		links.push(post);
	}
}
if (nlinks == 0)
	return;

mean = mean / nlinks;
nlinks *= 2;
for (var i=0; i<nlinks; i+=2) {
	var postnum = links[i];
	var post = links[i+1];
	if ((mean - postnum) > 2000) {
		post.setAttribute("style", "color: #000080");
		var img = document.createElement("img");
		img.src="http://media.ign.com/boardfaces/46.gif";
		img.setAttribute("style", "margin-right: 2px");
		post.parentNode.insertBefore(img, post);
	}
}
