// ==UserScript==
// @name        Kapsle 2013
// @namespace   http://fuckfrance.com
// @description Nakładka n stronę wikiego
// @include     http://kwiki.republika.pl/kapsle2013.html
// @version     1
// ==/UserScript==

var badpost = document.evaluate("//li[contains(.,'005') or contains(.,'011') or contains(.,'015') or contains(.,'004') or contains(.,'023') or contains(.,'018') or contains(.,'013') or contains(.,'002') or contains(.,'014') or contains(.,'012') or contains(.,'006') or contains(.,'016') or contains(.,'001') or contains(.,'003') or contains(.,'017')]", 
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i<badpost.snapshotLength; i++) {
		var post = badpost.snapshotItem(i);
		//alert('found');
		post.parentNode.removeChild(post);
		//alert('deleted');
	}