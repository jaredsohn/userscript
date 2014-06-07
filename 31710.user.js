// ==UserScript==
// @name           FetLife Jump to Comment Box link
// @namespace      http://userscripts.org/users/58147
// @description    Adds a link to jump to the comment box on posting pages
// @include        http://fetlife.com/*
// ==/UserScript==

postdivs = document.evaluate("id('group_post_comments') | id('post_comments_container') | id('comments')",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

if(postdivs.snapshotLength) {
	var thediv = document.createElement("div");
	thediv.innerHTML = "<p class='quiet small' style='margin-bottom:0;'>&darr; <a href=\"javascript:document.getElementsByName('commit')[0].scrollIntoView(0);\">Jump to Comment Box</a></p>";
	postdivs.snapshotItem(0).parentNode.insertBefore(thediv,postdivs.snapshotItem(0));
}