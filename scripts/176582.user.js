// ==UserScript==
// @name       Facebook Notification 
// @version    0.1
// @description  Notification placement is always on top of something else on comment/photo page. This script make those issues away.
// @include     /https?://www.facebook.com/(.*?)/posts/(.*?)\?comment_id(.*)$/
// @include     /https?://www.facebook.com/photo.php(.*)$/
// @exclude		/https?://www.facebook.com/$
// @copyright  2012+, sipp11
// ==/UserScript==

var css = "@namespace url(http://www.w3.org/1999/xhtml); #rightCol { display: none !important; } #contentArea { margin-left: 220px; } .fbPhotoPageInfo { margin-left:180px; }";
if (typeof GM_addStyle != "undefined") {
    GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
    addStyle(css);
} else {
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
        var node = document.createElement("style");
        node.type = "text/css";
        node.innerHTML = css;
        heads[0].appendChild(node); 
    }
}