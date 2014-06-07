// ==UserScript==
// @name           Gentoo Forums Readability
// @namespace      Gentoo Forums
// @description    Helps improve legibility of text
// @include        http://forums.gentoo.org/*
// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); html { padding-left: 20px !important; background-color: #271D45 !important; width: 80% !important; } body { background-color: #271D45 !important; } .maintitle { font-size: 16px; } .postbody { font-size: 13px; font-family: Bitstream Vera Sans, Liberation Mono, Sans; } .nav { } TD.catHead { padding: 8px !important; } .name { font-size: 12px; font-family: Bitstream Vera Sans, Liberation Sans, DejaVu Sans, Sans; line-height: 200% !important; } TD.row1 { padding: 12px !important; } TD.row2 { padding: 12px !important; } .postdetails { font-size: 12px; font-family: Bitstream Vera Sans, Liberation Sans, DejaVu Sans, Sans; line-height: 120% !important; } .genmed { font-size: 13px; font-family: Liberation Sans, DejaVu Sans, Sans; line-height: 120% !important; font-weight: normal !important; } .code { font-family: Monospaced, Liberation Mono } A:link { color: #836FBF; } A:active { color: #00DC30; } A:visited { color: #800072; } .gensmall { color:#8F85AB; } A.gensmall:hover { text-decoration:none; } A.nav:hover { text-decoration:none !important; color: #DEE3E7 !important; } A.topictitle:hover { text-decoration:none !important; color: #DEE3E7 !important; } .maintitle { font-size: 16px; font-family: Bitstream Vera Sans, Liberation Mono, Sans; text-decoration:none !important; color:#8F85AB; !important; } A:maintitle.hover { text-decoration:none !important; color: #DEE3E7 !important; } A.maintitle:hover { text-decoration:none !important; color: #DEE3E7 !important; } A:active { color: #26E156 !important; } A:hover { color: #DEE3E7 !important; }"
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
