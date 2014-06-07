// ==UserScript==
// @name           HNRetweet
// @namespace      http://userscripts.org/users/351198
// @description    Add Retweet links to Hacker News
//
//
// @include        http://news.ycombinator.com/*
// @include        https://news.ycombinator.com/*
// ==/UserScript==

(function() {

function x(node, xpath) {
	var iter, n, arr;

	iter = document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	arr = [];
	while (n = iter.iterateNext()) {
		arr.push(n);
	}
	return arr;
}

function retweet_link(node, href) {
	var a = document.createElement('a');
	a.href = href;
	a.appendChild(document.createTextNode("retweet"));
	a.onclick = function() {
		window.open(this.href, "hnrtw", "width=550,height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1,left=408,top=159");
		return false;
	};
	node.parentNode.insertBefore(a, node.nextSibling);
	node.parentNode.insertBefore(document.createTextNode(" | "), a.nextSibling || a);
}

function add_links() {
	x(document, '//td[@class="title"]/../following-sibling::*[1]//text()').filter(
		function(n) {return n.nodeValue.match(/ago( +\| *)?$/)}
	).forEach(function(n) {
		var title_a, qs, comment_a, id_match, id;
		if (title_a = x(n, '../../preceding-sibling::*[1]/td[@class="title"]/a[@href]')[0]) {
			qs = "?url=" + encodeURIComponent(title_a.href) + "&title=" + encodeURIComponent(title_a.childNodes[0].nodeValue);
			if (id_match = title_a.getAttribute('href').match(/^(http:\/\/news.ycombinator.com\/)?item\?id=(\d+)$/)) {
					//Post id in the article link
					id = id_match[2];
			} else if ((comment_a = x(n, '../a[starts-with(@href,"item\?id=")]')[0])
				&& (id_match = comment_a.getAttribute("href").match(/^item\?id=(\d+)$/))) {
					// Post id in the comment link
					id = id_match[1];
			}

			if (id) {
				retweet_link(n, "http://hn-retweet.appspot.com/retweet/" + id + qs);
			} else {
				// No id use article link
				retweet_link(n, "http://hn-retweet.appspot.com/retweet" + qs);
			}
		}
	});
}

if (document.readyState === "complete") {
	add_links();
} else {
	window.addEventListener('load', add_links, false);
}

})();

