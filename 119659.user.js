// ==UserScript==
// @name        Remove Promoted Stream Items
// @namespace   http://userscripts.org/
// @version     0.1
// @description Hides promoted items from Twitter streams.  Was only able to test with the stream from a sponsered hash tag, because promoted items in timelines are elusive.  More specifically, sets style "display: none" on the parent of divs with classes promoted-tweet and stream-item-content.
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// @author      Dan Carleton
// @copyright   2011+, Public Domain
// ==/UserScript==

// interval in milliseconds at which to check for new sponsered links to hide.
hideInterval = 2000

// the expression to match on for 
promotedItemXpath = "//div[contains(@class, 'promoted-tweet') and contains(@class, 'stream-item-content')]/.."

function hideSponseredItems() {
    var result = document.evaluate(
        promotedItemXpath,
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    
    for (var i = 0; i < result.snapshotLength; i++) {
        var target = result.snapshotItem(i);
        target.style.display = 'none';
    }
}

// hide any sponsered items that exist in the initial content from the server.
document.addEventListener("DOMContentLoaded", function(){
    document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
    hideSponseredItems()
}, false);

// periodically look for new sponsered items that have appeared and hide those too.
window.setInterval(hideSponseredItems, hideInterval);
