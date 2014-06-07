// ==UserScript==
// @name           Apple Discussions Highlight New
// @namespace      http://home.comcast.net/~teridon73
// @description    Highlight new posts
// @include        http://discussions.apple.com/thread.jspa*
// ==/UserScript==

function xpath(query, context)
{
	var cx = (arguments.length < 2) ? document : context;
	return document.evaluate(query, cx, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

var posts = xpath('//div[@class="jive-messagebox"]');
for (var i = 0; i < posts.snapshotLength; i++)
{
	var thisPost = posts.snapshotItem(i);
	var tds = thisPost.getElementsByTagName('td');
	for (var k = 0 ; k < tds.length ; k++) {
		thisTD = tds.item(k);
		var imgs = thisTD.getElementsByTagName('img');
		for (var j = 0 ; j < imgs.length ; j++) {
			switch ( imgs.item(j).title ) {
				case 'Unread':
					// Highlight me
					thisPost.style.border = "dashed 2px blue";
			}
		}
	}
}