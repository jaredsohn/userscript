// ==UserScript==
// @name           FotFA-fix
// @namespace      http://forums.xkcd.com/memberlist.php?mode=viewprofile&u=38797
// @include        http://for*.xkcd.com/*
// ==/UserScript==

posts = document.evaluate(
			  "//div[@class='content']",
			  document,
			  null,
			  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			  null);

var echoboj;
for (var i = 0; i < posts.snapshotLength; i++) {
    post = posts.snapshotItem(i);
    html = post.innerHTML;
    post.innerHTML = html.replace(/ \. \. \./g, ",");
}
