// ==UserScript==
// @name           Volokh Conspiracy: hide entries with zero comments
// @version        2
// @namespace      com.volokh/comments
// @include        http://volokh.com/*
// @include        http://www.volokh.com/*
// ==/UserScript==


GM_addStyle("div.post.comments_number_0 { display: none !important; }");

var $comment_link = document.evaluate(
	'//div[@id="content"]/div[@class="post"]//span[@class="mcomments"]/a',
	document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var $l = $comment_link.snapshotLength;
if (!$l) return;

for(var i=0; i<$l; i++) {
	var $anchor = $comment_link.snapshotItem(i);
	var $num = ( $anchor.textContent.match(/(\d+)/) )[0];
	var $post = 
	$anchor.parentNode // span.mcomments
	       .parentNode // span.mcategories
	       .parentNode // div.bottom-meta
	       .parentNode;// div.post
	$post.className += " comments_number_" + $num;
}