// ==UserScript==
// @name        Imperial Executive Summary
// @namespace   http://dumb.ass/
// @description Summarizes Imperial Executive's contributions.
// @include     http://campidiot.com/*
// @include     http://*.campidiot.com/*
// @version     1
// ==/UserScript==

var postleftLinks = document.evaluate(
	"//div[@class='postleft']/dl/dt/strong/" + 
		"a[@href='profile.php?id=27846']",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < postleftLinks.snapshotLength; i++) {
    var link = postleftLinks.snapshotItem(i);
	var inboxDiv =
	    link.parentNode.parentNode.parentNode.parentNode.parentNode;

    var postrightDivs = document.evaluate("div[@class='postright']", 
        inboxDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var j = 0; j < postrightDivs.snapshotLength; j++) {
        var postrightDiv = postrightDivs.snapshotItem(j);
        postrightDiv.innerHTML = "some dumb shit";
    }
}

var quoteH4s = document.evaluate(
    "//div[@class='postright']/div[@class='postmsg']/blockquote/" +
        "div[@class='incqbox']/h4",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    
for (i = 0; i < quoteH4s.snapshotLength; i++) {
    var quoteH4 = quoteH4s.snapshotItem(i);
    if (quoteH4.innerHTML == 'ImperialExecutive wrote:') {
        var incqbox = quoteH4.parentNode;
        incqbox.innerHTML = 
            '<h4>ImperialExecutive wrote:</h4><p>some dumb shit</p>';
    }
}
