// ==UserScript==
// @name            Cleanup: Premium TV Sites
// @description     Remove unwanted elements from PTV Sites
// @include         http://*.premiumtv.co.uk/*
// ==/UserScript==

get_ads = document.evaluate("//td[@class='layout advertColumn']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < get_ads.snapshotLength; i++) {
   current_ad = get_ads.snapshotItem(i);
   current_ad.parentNode.removeChild(current_ad);
}
get_ads = document.evaluate("//td[@class='layout teaserColumn']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < get_ads.snapshotLength; i++) {
   current_ad = get_ads.snapshotItem(i);
   current_ad.parentNode.removeChild(current_ad);
}
get_ads = document.evaluate("//div[@class='advert']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < get_ads.snapshotLength; i++) {
   current_ad = get_ads.snapshotItem(i);
   current_ad.parentNode.removeChild(current_ad);
}
get_ads = document.evaluate("//a[@href='/redirect/']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < get_ads.snapshotLength; i++) {
   current_ad = get_ads.snapshotItem(i);
   current_ad.parentNode.removeChild(current_ad);
}


get_world = document.evaluate("//div[@class='mediaEntry']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < get_world.snapshotLength; i++) {
   current_world = get_world.snapshotItem(i);
   current_world.parentNode.removeChild(current_world);
}
