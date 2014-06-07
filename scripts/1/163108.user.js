// ==UserScript==
// @name        BBC Live Commentary: Hide Tweets
// @namespace   none
// @description Hide the Twitterrhea from BBC live commentary pages (designed for sport, might also improve news)
// @include     http://www.bbc.co.uk/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @version     9.0
// @grant       GM_addStyle
// ==/UserScript==
/*- The @grant directive is needed to work around a design change
    introduced in GM 1.0.   It restores the sandbox.
*/

//-- Find all tweet items within the commentary, and hide them.
waitForKeyElements ("#live-event-text-commentary ol li.class-TWEET", removeTweets);
waitForKeyElements ("#live-event-text-commentary ol li.class-SMS", removeTweets);

//The new BBC Sport Beta pages are a different beast with absolutely horrible markup. 
//This should catch them, though as the page is in beta, it's subject to change.
waitForKeyElements ("li.lx-ltc__posts--user", removeTweets);

function removeTweets (jNode) {
    jNode.hide ();
}

// More and more stories tend to have a dedicated Tweets sidebar; kill it with fire
var snapResults = document.evaluate(".//div[@class='sps-twitter_module']", document.body, null, 
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
          snapResults.snapshotItem(i).style.display="none"; 
}