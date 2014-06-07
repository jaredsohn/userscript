// ==UserScript==
// @name          GMail Highlight Row
// @version       1.0
// @description   GMail Highlight Row
// @author        Eran Ben-Ami
// @license       http://creativecommons.org/licenses/by-nc-sa/3.0/
// @orig_authors  see script page for credits and thanks
// @include       http*://mail.google.com/*
// ==/UserScript==
(function() {
    var css = "@namespace url(http://www.w3.org/1999/xhtml);";

    /* BLOCK THE ADS TABLE IN THE MESSAGE WINDOW */
    css += "div[class=\"z0DeRc\"], div[class=\"MI\"], .u5, .u8 { display: none !important } table[class=\"T1HY1 nH iY\"], textarea.ir { width: 100% !important } div[class=\"ip iq\"] { margin-right: 13px !important} ";

    /* UNREAD */
    css += "table.cf tr.zE, table.tlc tr.ur { color: black !important; background-color : dodgerblue !important; font-style: italic !important;} "
    /* HOVER */
    css += "table.cf tr.zE:hover, table.tlc tr.ur:hover, table.cf tr.yO:hover, table.tlc tr.rr:hover { color : black !important; background-color: darkorange !important;} ";
    /* SELECTED */
    css += "table.cf tr.x7 { color: black !important; font-style: oblique !important; background-color : gold !important; } "

    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            var node = document.createElement("style");
            node.type = "text/css";
            node.appendChild(document.createTextNode(css));
            heads[0].appendChild(node);
        }
    }
})();