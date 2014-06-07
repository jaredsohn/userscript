// ==UserScript==
// @name           Stay Classy, Retweets
// @namespace      http://www.red-bean.com/decklin/userscripts/
// @description    Add a class for the user retweeting a tweet
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

HTMLDocument.prototype.snap = Node.prototype.snap = function(path) {
    return document.evaluate(path, this,
        null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
};
XPathResult.prototype.snapEach = function(f) {
    for (var i = 0; i < this.snapshotLength; i++) f(this.snapshotItem(i));
};

var statusPath =
    '//li[starts-with(@id, "status_") and contains(@class, "share")]';
var rtPath =
    'span[contains(@class, "status-body")]' +
    '/span[contains(@class, "retweet-meta")]';
var namePath =
    'span[contains(@class, "shared-content")]' +
    '/a[contains(@class, "screen-name")]';

document.snap(statusPath).snapEach(function(status) {
    status.snap(rtPath).snapEach(function(rt) {
        rt.snap(namePath).snapEach(function(name) {
            status.className += ' r-' + name.innerHTML;
        });
    });
});
