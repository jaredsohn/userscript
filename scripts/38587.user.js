// ==UserScript==
// @name           Twitter Stream Viewer Link
// @namespace      http://www.sukechan.net/
// @description    Add "Twitter Stream Viewer"(http://www.sukechan.net/labs/stream_viewer/) link to Twitter permanent page.
// @include        http://twitter.com/*/status/*
// @include        http://twitter.com/*/statuses/*
// @version        1.0.1
// ==/UserScript==

(function() {
	userarr = new Array();
	
	var t = document.evaluate('//span[@class="entry-content"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(t.snapshotLength > 0) {
		var tweet = t.snapshotItem(0).textContent;
		var link = tweet.match(/@[a-z0-9_]+\b/ig);
		if(link) {
			for(var i = 0; i < link.length; i++) {
				userarr.push(link[i].substr(1));
			}
		}
	}
	
	var u = document.evaluate('//div[@class="screen-name"]/descendant::a[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(u.snapshotLength > 0) {
		var user = u.snapshotItem(0).textContent;
		userarr.push(user);
	}
	
	if(userarr.length > 0) {
		var pnode = document.getElementById('permalink');
		if(pnode) {
			var div = document.createElement('div');
			div.style.fontSize = '10px';
			div.style.textAlign = 'right';
			var a = document.createElement('a');
			a.href = 'http://www.sukechan.net/labs/stream_viewer/?user=' + userarr.join('+');
			a.appendChild(document.createTextNode('Stream Viewer で見る (' + userarr.join('+') + ')'));
			div.appendChild(a);
			pnode.appendChild(div);
		}
	}
})();