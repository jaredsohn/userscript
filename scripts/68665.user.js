// ==UserScript==
// @name           Twitter Reply Title
// @namespace      http://www.red-bean.com/decklin/userscripts/
// @description    Add text of in-reply-to tweets to TITLE of their link
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

var anchorPath =
    '//li[starts-with(@id, "status_")]' +
    '/span[contains(@class, "status-body")]' +
    '/span[contains(@class, "entry-meta")]' +
    '/a[not(contains(@rel, "bookmark"))]';

document.snap(anchorPath).snapEach(function(a) {
    if (/^in reply to (\w+)$/.test(a.innerText)) {
        var m = /^http:\/\/twitter\.com\/(\w+)\/status\/(\d+)$/.exec(a.href);
        if (m) {
            xhr('http://twitter.com/statuses/show/'+m[2]+'.json', function() {
                var statusContent = JSON.parse(this.responseText);
                a.title = statusContent.text;
            });
        }
    }
});

function xhr(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4)
            callback.apply(xhr);
    };
    xhr.send();
}
