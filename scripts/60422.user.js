// ==UserScript==
// @name           Reason.com - unthreaded comments
// @namespace      com.reason/unthreaded-comments
// @include        http://reason.com/*
// @include        http://www.reason.com/*
// @version        4
// ==/UserScript==

var xpath_comments = "//div[@id='commentcontainer']/div[@id]",
    xpath_date = "h2/text()";

var comments = document.evaluate(xpath_comments, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (!comments) return;

var num_comments = comments.snapshotLength,
    posts = {},
    dates = [];
for (var i=0; i<num_comments; i++) {
	var comment = comments.snapshotItem(i);
	var date_node = document.evaluate(xpath_date, comment, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
	try {
		// this relies on the specific format of the timestamp string MM.DD.YY @ h:mm[AP]M
		var m = date_node.singleNodeValue.nodeValue.match(/(\d+)\.(\d+)\.(\d+)\ @ (\d+)(:\d+)([AP]M)/);
//		var date_num = (new Date('20'+m[3] +' '+ m[2] +' '+ m[1] +' '+ ((parseInt(m[4],10)%12)+(m[6]=='PM'?12:0)) + m[5])).getTime();
		var date_num = (new Date('20'+m[3] +' '+ m[1] +' '+ m[2] +' '+ ((parseInt(m[4],10)%12)+(m[6]=='PM'?12:0)) + m[5])).getTime();
	} catch (err) {
		GM_log(err);
		continue;
	}
	posts[date_num+comment.id] = comment;
	dates.push(date_num+comment.id);
	comment.className = 'com-block depth0'; // make each one unindented, top-level
}


// reinsert at the bottom in order of date
var sorted = dates.sort(),
    num_dates = dates.length,
    container = document.getElementById('commentcontainer');
var container_parent = container.parentNode,
    container_nextsibling = container.nextSibling;
container_parent.removeChild(container); // take comment container out of the document, makes the comments' reinsertion much faster
for (var i=0; i<num_dates; i++) {
	var comment = posts[sorted[i]];
	container.appendChild( container.removeChild(comment) );
}
container_parent.insertBefore(container, container_nextsibling); // put comment container back
