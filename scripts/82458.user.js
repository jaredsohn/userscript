// ==UserScript==
// @name           TL Redirect to Stream Page
// @namespace      troynt+tl-stream-redirect@gmail.com
// @description    Redirects to User's Stream Page
// @include        http://www.teamliquid.net/video/userstream.php?user=*
// ==/UserScript==
var stream_links = document.evaluate(
    "//a[contains(@href,'livestream.com') or contains(@href,'ustream.tv')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
if( stream_links.snapshotLength > 0 ) {
	window.location = stream_links.snapshotItem(0).href;
}