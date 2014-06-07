// Facebook - Hide FeedAds v0.1
// Made By Luke Stevenson {http://www.lucanos.com/}
// Distributed and Maintained via GMVC
// Last updated: 06 August 2007
//
//   Identifies and hides the components within your Facebook feed which
// are marked as advertisements.
//
// ==UserScript==
// @name              Facebook - Hide FeedAds
// @namespace         http://gmvc.lucanos.com/
// @description       (v0.1) Hides the Ads inserted into your Facebook Feed
// @include           http://www.facebook.com/home.php?
// ==/UserScript==

var adFeeds;
// Get All Ad_Capsule Elements from the Facebook Feed
adFeeds = document.evaluate('//*[@class="feed_item clearfix ad_capsule"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for ( var i = 0; i < adFeeds.snapshotLength; i++ ) {
	adFeeds.snapshotItem(i).style.display = "none";
}