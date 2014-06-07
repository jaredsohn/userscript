// ==UserScript==
// @name           Direct imgur images
// @description    Get direct links to the image
// @include        *
// ==/UserScript==

(function() {

    var xpath = '//a[contains(@href,"imgur.com")]';

    function rewriteURL(url) {
        return url.replace('//imgur.com', '//i.imgur.com')
    }

    function appendjpg(url){
        if ((url.substring(url.length - 4, url.length -3)) != "." ){
            return url + ".jpg"    
        } else {
            return url
        }
    }

    var nodesSnapshot = document.evaluate(
            xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


    for (var i = 0; i < nodesSnapshot.snapshotLength; ++i) {
        var link = nodesSnapshot.snapshotItem(i);
        var href = link.attributes.getNamedItem('href');
        href.nodeValue = rewriteURL(href.nodeValue);
        href.nodeValue = appendjpg(href.nodeValue);
        link.textContent = rewriteURL(link.textContent);
        link.textContent = appendjpg(link.textContent);
    }
})();