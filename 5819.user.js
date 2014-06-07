// ==UserScript==
// @name        blogspot edit thingy
// @description Change the Edit-post link so that mlb will see it.
// @include     http://*.blogspot.com/*
// ==/UserScript==


var allEditPosts, thisEditPost;
allEditPosts = document.evaluate(
    "//a[@title='Edit Post']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


for (var i = 0; i < allEditPosts.snapshotLength; i++) {
    thisEditPost = allEditPosts.snapshotItem(i);

    // Add some text...
    text = thisEditPost.innerHTML;
    thisEditPost.innerHTML = text + '.';
}
