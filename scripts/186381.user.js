// ==UserScript==
// @name        GIF to HTML5
// @namespace   Zephilinox
// @description URL GIF to HTML5 (gfycat.com), all sites including reddit and imgur (not album)
// @version     1
// @grant       
// ==/UserScript==
var allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var thisLink;
for (var i = 0; i < allLinks.snapshotLength; ++i)
{
    thisLink = allLinks.snapshotItem(i);
    
    if (thisLink.href.contains(".gif") && !thisLink.href.contains("gfycat.com"))
    {
        thisLink.pathname = "fetch/" + thisLink.host + thisLink.pathname;
        thisLink.host = "gfycat.com";
    }
}

var url = window.location.href;
if ((url.contains(".gif") && !url.contains("gfycat.com")) || 
    (url.contains("i.imgur.com") && document.title.contains("GIF Image") && !url.contains("gfycat.com")))
{
    window.location.href = "http://gfycat.com/fetch/" + url;
}