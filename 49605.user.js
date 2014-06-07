// ==UserScript==
// @author         Aleksey Maksimov
// @version        1.0
// @name           ETrade: Change Portfolio tab link
// @description    Changes Portfolio tab, so it will go directly to portfolio instead of "Enter order" page
// @namespace      http://www.ctpeko3a.com/
// @include        https://*.etrade.com/*
// ==/UserScript==

(function()
{

var xpathResult = document.evaluate(
    '/html/body/div/div/div[3]/ul/li[2]/div', 
    document, 
    null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

if (xpathResult.snapshotLength==0) {
    // Perhaps we're on Quotes and Research page, where XPath is different
    var xpathResult = document.evaluate(
        '/html/body/div/div[3]/ul/li[2]/div', 
        document, 
        null, 
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
}

for (var i=0; i<xpathResult.snapshotLength; i++) {
    var nodeToChange = xpathResult.snapshotItem(i);
    nodeToChange.setAttribute("onclick","GoToETURL('/e/t/pfm/portfolioview','etrade')");
}

})()



/* eof */