// ==UserScript==
// @name        Soup.io - no endless scroll
// @description Disables endless loading of content on soup.io and adds navigation links instead
// @namespace   https://projects.universe-factory.net/
// @match       http://*.soup.io/*
// @version     1
// @grant       none
// ==/UserScript==


function urlForOlder(url) {
    return url.replace(/&newer=1/,'').replace(/newer=1&/,'');
}


// disarm endless scolling
var next_url;

if (SOUP.Endless) {
    next_url = SOUP.Endless.next_url;
    SOUP.Endless = function() {}
}

// remove default links
var endlessnotice = document.evaluate("//div[contains(concat(' ',normalize-space(@class),' '),' endlessnotice ')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < endlessnotice.snapshotLength; i++) {
    var node = endlessnotice.snapshotItem(i);
    node.parentNode.removeChild(node);
}

var posts = document.getElementById("posts");

// try to add some HTML code from noscript tags
var parser = new DOMParser();
var noscripts = document.evaluate("//noscript", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < noscripts.snapshotLength; i++) {
    var node = noscripts.snapshotItem(i);
    var doc = parser.parseFromString(node.innerHTML, "text/html");

    var paginationTopSnapshot = doc.evaluate("//div[contains(concat(' ',normalize-space(@class),' '),' paginationtop ')]", doc, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
    if (paginationTopSnapshot.singleNodeValue != null) {
        var paginationTop = document.createElement("div");
        paginationTop.innerHTML = paginationTopSnapshot.singleNodeValue.innerHTML;
        paginationTop.className = "pagination paginationtop";
        posts.parentNode.insertBefore(paginationTop, posts);
    }

    var paginationBottomSnapshot = doc.evaluate("//div[contains(concat(' ',normalize-space(@class),' '),' paginationbottom ')]", doc, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
    if (paginationBottomSnapshot.singleNodeValue != null) {
        var paginationBottom = document.createElement("div");
        paginationBottom.innerHTML = paginationBottomSnapshot.singleNodeValue.innerHTML;
        paginationBottom.className = "pagination paginationbottom";

        try {
            document.evaluate("//a[@name='more']", paginationBottom, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.rel = "next";
        } catch (e) {
        }

        try {
            document.evaluate("//a[@name='back']", paginationBottom, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.rel = "prev";
        } catch (e) {
        }

        posts.parentNode.insertBefore(paginationBottom, posts.nextSibling);
    }
}


// add an own "more" link if we still don't have one
var paginationBottomCount = document.evaluate("count(//div[contains(concat(' ',normalize-space(@class),' '),' paginationbottom ')])", document, null, XPathResult.ANY_TYPE, null);

if (paginationBottomCount.numberValue == 0 && next_url && next_url != "none") {
    var paginationBottom = document.createElement("div");
    paginationBottom.style.marginBottom = "2em";

    var next_link_strong = document.createElement("strong");
    next_link_strong.style.fontSize = "150%";

    var next_link = document.createElement("a");
    next_link.href = urlForOlder(next_url);
    next_link.rel = "next";
    next_link.innerHTML = "More &rarr;";

    next_link_strong.appendChild(next_link);
    paginationBottom.appendChild(next_link_strong);

    posts.parentNode.insertBefore(paginationBottom, posts.nextSibling);
}
