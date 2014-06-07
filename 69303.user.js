// ==UserScript==
// @name           Swagster Image Resizer
// @description    This script resizes the image viewing pages on swagster.com to show the images at their full size and not scaled down to fit the window.
// @namespace      http://userscripts.org/users/133248
// @include        *swagster.com/img.php*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(".ff_comments_wrapper {width: 1155px ! important; }");
addGlobalStyle(".lower_content { width: 1500px ! important; }");
addGlobalStyle("img {max-width:2000px ! important;}");


var links, a;
links = document.evaluate(
    "//div[@class='google']//img",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 1; i < links.snapshotLength; i++) {
    a = links.snapshotItem(i);
    a.border = 1
}

addGlobalStyle(".google a:visited img {border-color: #ff0000 ! important}");
addGlobalStyle(".google a img {border-color: #ffffff ! important}");
