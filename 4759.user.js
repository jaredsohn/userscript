// ==UserScript==
// @name          Last.fm proxy
// @namespace     http://d.hatena.ne.jp/youpy
// @include       http://*last.fm/*
// ==/UserScript==

(function() {
    var proxy = 'http://localhost:1881/';
    var targets = document.evaluate('//a[starts-with(@href, "lastfm")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < targets.snapshotLength; i ++) {
	targets.snapshotItem(i).href = proxy + targets.snapshotItem(i).href;
    }
})();
