// ==UserScript==
// @name           N4GForwarder
// @namespace      http://thomasbueter.tk
// @description    Transports you directly to the "Read Full Story"-Link
// @include        http://n4g.com/news/*
// @include        http://techspy.com/news/*
// @exclude        http://n4g.com/news/search*
// @exclude        http://techspy.com/news/search*
// ==/UserScript==
var ReadFullStoryWrapper=document.evaluate(
"//a[contains(@href, 'clickout')]",
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
);
var ReadFullStoryLink=ReadFullStoryWrapper.snapshotItem(0);
this.window.location=ReadFullStoryLink;