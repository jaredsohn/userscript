// ==UserScript==
// @name          BoxTorrents news cleaner
// @description	  Remove the "recent news" table from the browse and search pages. News should only be on the "home" page, especially if it displays ABOVE the content, forcing the user to scroll every time they change pages.
// @include       http://www.boxtorrents.com/browse.php*
// @namespace http://www.ssokolow.com/
// ==/UserScript==

newsMatchExpr = "//table[@class='newsouttable']";

function removeIfMatch(xpathExpr) {
    if (results = document.evaluate(xpathExpr, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)) {
        for (var i = 0; i < results.snapshotLength; i++) {
            target = results.snapshotItem(i);
            target.parentNode.removeChild(target);
        }
    }
}

(function() 
{
    try { removeIfMatch(newsMatchExpr); } 
    catch (e) { alert("UserScript exception: " + e); }
} 
)();
