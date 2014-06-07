/*

Old-Facebook redirect
Domain edited by Jonathan M. (2008)

*/

// ==UserScript==
// @name        Old-Facebook Redirect
// @description Redirects you to the old Facebook
// @version     0.5
// @include     http://www.facebook.com/*
// @include     http://www.new.facebook.com/*
// @include     https://www.facebook.com/*
// @include https://apps.facebook.com/*
// ==/UserScript==

if (window.location.href.match("http://")) {
var facebookUrl = window.location.href;
var urlArray = facebookUrl.split("com/");
var targetUrl = "https://www.facebook.com/" + urlArray[1];
window.location = targetUrl;
} else {

    var links = document.evaluate("//a[contains(@href,'facebook')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var appLinks = document.evaluate("//a[contains(@href,'apps.')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for(var i = 0; i < links.snapshotLength; i++)
    {
        var this_link = links.snapshotItem(i);
        var linkUrlArray = this_link.getAttribute("href").split("com/");
        var linkNewUrl = "https://www.facebook.com/" + linkUrlArray[1];
        this_link.setAttribute("href", linkNewUrl);

    }
    for(var i = 0; i < appLinks.snapshotLength; i++)
    {
        var this_link = appLinks.snapshotItem(i);
        var linkUrlArray = this_link.getAttribute("href").split("com/");
        var linkNewUrl = "https://apps.facebook.com/" + linkUrlArray[1];
        this_link.setAttribute("href", linkNewUrl);

    }

}
