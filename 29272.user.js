// ==UserScript==
// @name           Summize Replies
// @namespace      _Coffey
// @description    Replaces the Replies Tab, with a link to summize.com
// @include        http://twitter.com/home
// @include        https://twitter.com/home
// ==/UserScript==

var repliesElement;
var userName;

repliesElement = document.evaluate(
    "//a[@id='replies_link']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);

userName = document.evaluate(
    "/html/body[@id='home']/div[@id='container']/div[@id='side_base']/div[@id='side']/div[1]/div[1]/a",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0).href.split('/').pop();
    
if (repliesElement.href == "https://twitter.com/home#" || repliesElement.href == "http://twitter.com/home#") {
    repliesElement.href = "http://summize.com/search?to=" + userName;
}