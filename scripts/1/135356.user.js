// ==UserScript==
// @name        freedla.com // remove adfly from links
// @namespace   ktz
// @include     http://freedla.com/*
// @version     1.1
// ==/UserScript==
(function() {

    /* defining a trim function for strings for convenience */
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g,"");
    }

    /* defining a function for strings to check if they're links for convenience */
    String.prototype.isLink = function() {
        return /^\s*http.*/.test(this);
    }
    
    /* the links inside an entry */
    var xpath_links = '/descendant::div[contains(@class, "entry")]/descendant::a[@rel="nofollow"]';
    var xpath_text_links = '/descendant::div[contains(@class, "entry")]/child::p[not(child::a)]';

    /* evaluate xpath expression, thus finding the links */
    var xpath_links_result = document.evaluate(xpath_links, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    
    /* processing the links one by one*/
    for (var i = 0; i < xpath_links_result.snapshotLength; i++) {
        var link = xpath_links_result.snapshotItem(i);
        if (link.firstChild && link.firstChild.nodeType == 3) {
            link.href = link.firstChild.data.trim();
        }
    }

    /* evaluate xpath expression, thus finding the text links */
    var xpath_text_links_result = document.evaluate(xpath_text_links, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    /* processing the links one by one*/
    for (var i = 0; i < xpath_text_links_result.snapshotLength; i++) {
        var link = xpath_text_links_result.snapshotItem(i);
        if (link.firstChild && link.firstChild.nodeType == 3) {
            if (link.firstChild.data.isLink()) {
                var new_link = document.createElement('a');
                new_link.appendChild(document.createTextNode(link.firstChild.data));
                new_link.setAttribute('href', link.firstChild.data.trim());
                link.replaceChild(new_link,link.firstChild);
            }
        }
    }

})();