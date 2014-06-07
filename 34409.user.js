// ==UserScript==
// @name           removes ads on silabsoft
// @description    Removes ads on ss
// @include        http://client.silabsoft.org/client.php
// ==/UserScript==

// XPath function
function xp(_exp, t, n) {
var exp = _exp || "//*"; // XPath Expression
var type = t || 6; // XPath type (e.g., 6=unordered node snapshot)
var node = n || document; // XPath search node (only for advanced users; research it)
if(type==9) {return document.evaluate(exp, node, null, 9, null).singleNodeValue;}
else {return document.evaluate(exp, node, null, type, null);}
}

function main() {

// REMOVES ADS //////////////////////////////////////////////////////////////////////////
var ringtone_ads, google_ads, long_ad, top_long_ads, i, iframes;
if(location.href.indexOf("ultimate-guitar.com/tabs/") !== -1) {
ringtone_ads = xp("//div/img[contains(@src, 'ring_left.gif')]");
google_ads = xp("//script[contains(@src, 'show_ads.js')]");
top_long_ads = xp("//script[contains(@src, 'rmtag3.js')]//script[contains(@src, 'ad.yieldmanager.com')]");
long_ad = xp("//td[@id='tab_content']",9);
iframes = xp("//iframe");
// Remove ringtone ads
for(i=ringtone_ads.snapshotLength-1; i>=0; i--) {
if(ringtone_ads.snapshotItem(i)) ringtone_ads.snapshotItem(i).parentNode.style.display = 'none';
}
// Remove top long ads
for(i=top_long_ads.snapshotLength-1; i>=0; i--) {
if(top_long_ads.snapshotItem(i)) top_long_ads.snapshotItem(i).style.display = 'none';
}
// Removes iframes
for(i=iframes.snapshotLength-1; i>=0; i--) {
if(iframes.snapshotItem(i)) iframes.snapshotItem(i).style.display = 'none';
}
// Remove google ads
for(i=google_ads.snapshotLength-1; i>=0; i--) {
if(google_ads.snapshotItem(i).nextSibling) google_ads.snapshotItem(i).nextSibling.style.display = 'none';
}
// Remove long ad on the left
if(long_ad) long_ad.previousSibling.previousSibling.style.display = 'none';
}
///////////////////////////////////////////////////////////////////////////////////////////

// AUTO-DOWNLOAD //////////////////////////////////////////////////////////////////////////
/*
if(location.href.indexOf("guitar_pro")!==-1 ||
location.href.indexOf("power_tab")!==-1) {
// Initiate download
xp("//form[contains(@action, '/*/')]",9).submit();
}
*/
///////////////////////////////////////////////////////////////////////////////////////////
}


// Run when page is loaded
if (document.addEventListener) {
window.addEventListener("load", main, false);
}
else {
window.document.onLoad = main();
}