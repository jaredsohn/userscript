// ==UserScript==
// @name           XTube - Exclude Amateur Preview Videos
// @description    Hides the thumbnails for amateur videos which require payment, and all videos from the users "xtubehouse", xtube_sponsor, xxxvids
// @author         Signe - http://www.cothlamadh.net/
// @namespace      http://www.cothlamadh.net/greasemonkey
// @include        http://www.xtube.com/*
// @include        http://*xtube.com/*
// @include        http://www.xtube.com/index.php*
// @include        http://www.xtube.com/results.php*type=video*
// @include        http://www.xtube.com/videos*.php*
// @include        http://video*.xtube.com/watch.php?*
// @include        http://www.xtube.com/results_as_vs.php*
// @include        http://www.xtube.com/video_search.php*
// ==/UserScript==

var amateurRegex = /\/amateur_img\//;
var sponsoredRegex = /(xtubehouse|xtube_sponsor|xxxvids)/;

GM_addStyle('div.hideSponsored { color: black; text-align: center; }');

// results.php has a different format than the video and index pages
if (document.URL.indexOf('results.php') != -1 || document.URL.indexOf('results_as_vs.php') != -1) {
    var tableData = document.evaluate('//div[@class="result_video"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < tableData.snapshotLength; i++) {

        // Search for the amateur video previews
        var contentData = document.evaluate('.//img[@class="imgBrdr"]', tableData.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (contentData.snapshotLength && amateurRegex.test(contentData.snapshotItem(0).src)) {
            tableData.snapshotItem(i).parentNode.parentNode.removeChild(tableData.snapshotItem(i).parentNode);
            continue;
        } 

        // Search for the "sponsor" accounts, like xtubehouse and xtube_sponsor
        var contentData = document.evaluate('.//*[@class="row_result"]/a[2]', tableData.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (contentData.snapshotLength && sponsoredRegex.test(contentData.snapshotItem(0).href)) {
            var matches = sponsoredRegex.exec(contentData.snapshotItem(0).href)
            tableData.snapshotItem(i).parentNode.parentNode.removeChild(tableData.snapshotItem(i).parentNode);
            continue;
        }
    }
} else if (document.URL.indexOf('watch.php') != -1) {
    var tableData = document.evaluate('//div[@id="related_videos_tab"]//tr', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < tableData.snapshotLength; i++) {
        
        // Search for the amateur video previews
        var contentData = document.evaluate('.//div[@class="shadow_sr"]/a/img', tableData.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (contentData.snapshotLength && amateurRegex.test(contentData.snapshotItem(0).src)) {
            tableData.snapshotItem(i).innerHTML = "";
            tableData.snapshotItem(i).style.visibility = "hidden";
            tableData.snapshotItem(i).style.display = "none";
            tableData.snapshotItem(i).nextSibling.style.display = "none";
            continue;
        }
        
        // Search for the "sponsor" accounts, like xtubehouse and xtube_sponsor
        var contentData = document.evaluate('.//div/a/span', tableData.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (contentData.snapshotLength && sponsoredRegex.test(contentData.snapshotItem(0).innerHTML)) {
            tableData.snapshotItem(i).style.visibility = "hidden";
            tableData.snapshotItem(i).style.display = "none";
            tableData.snapshotItem(i).nextSibling.style.display = "none";
            continue;
        }
    }
} else if (document.URL.indexOf('video_search.php') != -1) {
    var tableData = document.evaluate('//div[@class="content_d"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < tableData.snapshotLength; i++) {

        // Search for the amateur video previews
        var contentData = document.evaluate('.//img[@class="imgBrdr"]', tableData.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (contentData.snapshotLength && amateurRegex.test(contentData.snapshotItem(0).src)) {
            tableData.snapshotItem(i).parentNode.parentNode.removeChild(tableData.snapshotItem(i).parentNode);
            continue;
        } 

        // Search for the "sponsor" accounts, like xtubehouse and xtube_sponsor
        var contentData = document.evaluate('.//a[@class="username"]', tableData.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (contentData.snapshotLength && sponsoredRegex.test(contentData.snapshotItem(0).href)) {
            var matches = sponsoredRegex.exec(contentData.snapshotItem(0).href)
            tableData.snapshotItem(i).parentNode.parentNode.removeChild(tableData.snapshotItem(i).parentNode);
            continue;
        }
    }

} else if (document.URL.indexOf('subscription.php') != -1) {
    GM_addStyle('#content #subscribe-left #bhead .album { overflow: visible; }');
    var tableData = document.evaluate('//div[@class="item"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < tableData.snapshotLength; i++) {
        // tableData.snapshotItem(i).style.background = "red";
        var contentData = document.evaluate('.//img', tableData.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (contentData.snapshotLength && amateurRegex.test(contentData.snapshotItem(0).src)) {
            tableData.snapshotItem(i).parentNode.parentNode.removeChild(tableData.snapshotItem(i).parentNode);
            continue;
        } 
    }
}else if (document.URL.indexOf('videos2.php') != -1) {
    var tableData = document.evaluate('//div[@class="content_d"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < tableData.snapshotLength; i++) {

        // Search for the amateur video previews
        var contentData = document.evaluate('.//img[@class="corners iradius5"]', tableData.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (contentData.snapshotLength && amateurRegex.test(contentData.snapshotItem(0).src)) {
            tableData.snapshotItem(i).parentNode.parentNode.removeChild(tableData.snapshotItem(i).parentNode);
            continue;
        } 

        // Search for the "sponsor" accounts, like xtubehouse and xtube_sponsor
        var contentData = document.evaluate('.//a[@class="username"]', tableData.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (contentData.snapshotLength && sponsoredRegex.test(contentData.snapshotItem(0).href)) {
            var matches = sponsoredRegex.exec(contentData.snapshotItem(0).href)
            tableData.snapshotItem(i).parentNode.parentNode.removeChild(tableData.snapshotItem(i).parentNode);
            continue;
        }
    }

} else {
    var tableData = document.evaluate('//*[@class="subsubmenu"]/tbody/tr/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < tableData.snapshotLength; i++) {
        
        // Search for the amateur video previews
        var contentData = document.evaluate('.//*[@class="shadow_sr"]/a/img', tableData.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (contentData.snapshotLength && amateurRegex.test(contentData.snapshotItem(0).src)) {
            tableData.snapshotItem(i).parentNode.parentNode.removeChild(tableData.snapshotItem(i).parentNode);
            continue;
        }
        
        // Search for the "sponsor" accounts, like xtubehouse and xtube_sponsor
        var contentData = document.evaluate('.//*[contains(@class, "thumb_info")]/b/a', tableData.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (contentData.snapshotLength && sponsoredRegex.test(contentData.snapshotItem(0).href)) {
            var matches = sponsoredRegex.exec(contentData.snapshotItem(0).href)
            tableData.snapshotItem(i).parentNode.parentNode.removeChild(tableData.snapshotItem(i).parentNode);
            continue;
        }
    }
	
	var tableData = document.evaluate('//div[@class="content_d"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < tableData.snapshotLength; i++) {

        // Search for the amateur video previews
        var contentData = document.evaluate('.//img[@class="corners iradius5"]', tableData.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (contentData.snapshotLength && amateurRegex.test(contentData.snapshotItem(0).src)) {
            tableData.snapshotItem(i).parentNode.parentNode.removeChild(tableData.snapshotItem(i).parentNode);
            continue;
        } 

        // Search for the "sponsor" accounts, like xtubehouse and xtube_sponsor
        var contentData = document.evaluate('.//a[@class="username"]', tableData.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (contentData.snapshotLength && sponsoredRegex.test(contentData.snapshotItem(0).href)) {
            var matches = sponsoredRegex.exec(contentData.snapshotItem(0).href)
            tableData.snapshotItem(i).parentNode.parentNode.removeChild(tableData.snapshotItem(i).parentNode);
            continue;
        }
    }
}