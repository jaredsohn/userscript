// ==UserScript==
// @name           Reddit Child Comment Collapser 
// @description    Collapse all child comments of root comments.
// @include        http://*.reddit.com/r/*/comments/*
// @include        http://reddit.com/r/*/comments/*
// ==/UserScript==

var childComments, curChild;

childComments = document.evaluate(
    "//div[@class='sitetable nestedlisting']/div/div[@class='child']/div/div/div/div[@class='noncollapsed']/p/a[@class='expand']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
	
var clickEvent = document.createEvent("HTMLEvents");
clickEvent.initEvent("click", true, true);

for (var i = 0; i < childComments.snapshotLength; i++) {
    curChild = childComments.snapshotItem(i);
	curChild.dispatchEvent(clickEvent);
}