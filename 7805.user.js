// {4f0077a5-6a45-4525-992b-9cd8a161a98a}
// ==UserScript==
// @name            Annoying Twat Blocker
// @namespace       http://dresstosurvive.wordpress.com/twat-blocker/
// @description     Removes comments by annoying twats on Violent Acres Talk
// @include         http://www.violentacrestalk.com/*
// @include         http://*.violentacrestalk.com/*
// ==/UserScript==

var allComments, thisComment;

allComments = document.evaluate(
    "//li[contains(., 'Emerild')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allComments.snapshotLength; i++) {
    thisComment = allComments.snapshotItem(i);
    thisComment.parentNode.removeChild(thisComment);
}