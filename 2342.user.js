// ==UserScript==
// @name           Raysoda Keyboard Navigation
// @author         Min Lee
// @namespace      http://minwoo.blogsite.org
// @description    Adds keyboard shortcuts for paging through Raysoda.  Inspired by Flickr Keyboard Navigation.
// @include        http://raysoda.com*//
// @include        http://www.raysoda.com*//

// How to Use:
// alt+n - Next Page
// alt+p - Previous Page

// ==/UserScript==
function gm_xpath(what, where) {
    return document.evaluate(what, where, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

cur = gm_xpath("//a[@class='cur-cmd']", document).snapshotItem(1);
if (cur.parentNode.nextSibling) {
    a_next = cur.parentNode.nextSibling.firstChild;
    a_next.setAttribute("accesskey", "n");
}
if (cur.parentNode.previousSibling) {
    a_prev = cur.parentNode.previousSibling.firstChild;
    a_prev.setAttribute("accesskey", "p");
}
