// ==UserScript==
// @name        Facebook ollie blocker
// @namespace   na
// @description removies ollie from facebook
// @include     http://facebook.com/*
// @include     http://*.facebook.com/*
// @exclude     *facebook.com/logout.php*
// @exclude     *facebook.com/*logged_out*
// @author      alexpb
// @timestamp   ?
// ==/UserScript==


var allLinks, thisLink;
allLinks = document.evaluate(
    "//div[@class='ufi_section show_all_link']",
    //"//span[@title='Oliver Ives']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    if (thisLink){
      thisLink.parentNode.removeChild(thisLink);
    }
    // do something with thisLink
}

allLinks = document.evaluate(
    "//div[span='Oliver Ives']",
    //"//span[@title='Oliver Ives']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    if (thisLink){
      thisLink.parentNode.parentNode.removeChild(thisLink.parentNode);
    }
    // do something with thisLink
}
allLinks = document.evaluate(
    //"//div[span='Oliver Ives']",
    "//span[@title='Oliver Ives']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    if (thisLink){
      thisLink.parentNode.parentNode.removeChild(thisLink.parentNode);
    }
    // do something with thisLink
}

//var adSidebar = document.getElementById('ads');
//#if (adSidebar) {
//    adSidebar.parentNode.removeChild(adSidebar);
//}