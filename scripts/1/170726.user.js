// ==UserScript==
// @name           Danbooru Querystring Remover
// @description    Removes annoying ?tags=artst_blah from image links
// @namespace      http://userscripts.org/users/tearshed
// @include        http://danbooru.donmai.us/*
// ==/UserScript==

var oldLink = document.evaluate("//a[contains(@href, 'posts/')]", document, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < oldLink.snapshotLength; i++) {
    var newLink = oldLink.snapshotItem(i);
    newLink.href = newLink.href.replace(/\?(.+)/g, '');
}