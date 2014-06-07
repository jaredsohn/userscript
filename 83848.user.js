// ==UserScript==
// @name           N4GForwarder (in Tab)
// @namespace      http://thomasbueter.tk
// @description    Transports you to the "Read Full Story"-Link on N4G.com in a new tab
// @include        http://n4g.com/news/*
// @include        http://techspy.com/news/*
// @exclude        http://n4g.com/news/search*
// ==/UserScript==
var ReadFullStoryWrapper=document.evaluate(
"//a[contains(@href, 'clickout')]",
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
);

var ReadFullStoryLink=ReadFullStoryWrapper.snapshotItem(0);
GM_openInTab(ReadFullStoryLink, true);