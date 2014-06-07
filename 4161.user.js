// ==UserScript==
// @name          Newzbin NFO Filter
// @namespace     http://raneses.com/firefox/greasemonkey/newzbin
// @description   Filters Newzbin posts without attached NFOs
// @version       1.0.0
// @include       http://www.newzbin.com/*
// ==/UserScript==

filter();

function filter()
{
    var results = getNodes("//table[@class = 'dogresults']", document);
    
    if (results.snapshotLength == 1)
    {
        var table = results.snapshotItem(0);
        var row;
        
        results = getNodes(".//tr[@class = 'new' or @class = 'even' or @class = 'odd']", table);
        
        for (var i = 0; i < results.snapshotLength; i++)
        {
            row = results.snapshotItem(i);
            
            if (getNodes(".//img[@alt = 'N']", row).snapshotLength == 0)
                row.style.display = "none";
        }
    }
}

function getNodes(what, where)
{
    return document.evaluate(what, where, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
