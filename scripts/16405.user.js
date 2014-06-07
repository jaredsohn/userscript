// ==UserScript==
// @name           Tumblr Followers List
// @namespace      http://www.fuddmain.com
// @description    Presents a textarea with links to your followers.  Ideal for copy and paste.
// @include        http://www.tumblr.com/followers
// ==/UserScript==

var allLinks, thisLink, linkList, listHtml, following;
linkList = document.createElement("textarea");
linkList.style.width = '500px';
linkList.style.height = '200px';
listHtml = '';
following = document.getElementById('following');

allLinks = document.evaluate(
    '//div[@class="username"]//a',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    listHtml = listHtml + '&lt;a href="'+ thisLink + '"&gt;' + thisLink.textContent + '&lt;/a&gt;\n';
}

linkList.innerHTML = listHtml;

if (following) {
    following.parentNode.insertBefore(linkList, following);
}


