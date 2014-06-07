// ==UserScript==
// @name           Digg Short URL Expander
// @namespace      http://www.ofzenandcomputing.com/zanswers/2288
// @description    Expands Digg short URLs
// @include        http://*
// @include        https://*
// ==/UserScript==

var diggLinks, currLink;
diggLinks = document.evaluate(
    "//a[contains(@href, 'digg.com')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < diggLinks.snapshotLength; i++) {
    currLink = diggLinks.snapshotItem(i);
    var re = currLink.href.match(/^http:\/\/(www\.)?digg\.com\/(\w{1,8})\/?/i);
    if (re && re[2] != 'preview') {
        GM_xmlhttpRequest({
            method: 'get',
            url: 'http://services.digg.com/url/short/'+re[2]
                    +'?type=json&appkey=http://www.ofzenandcomputing.com/zanswers/2288',
            onload: function(response) {
                eval('var obj = '+response.responseText);
                if (obj.shorturls[0].link) {
                    currLink.href = obj.shorturls[0].link;
                }
            }
        });
    }
}