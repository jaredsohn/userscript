// ==UserScript==
// @name			Extending the Reach Button Fixer
// @namespace		FreakBoyScript
// @description		Changes the font for buttons on extendingthereach.com to black so they're actually readable.
// @include			https://*.enabletrading.com/*
// @author			FreakBoy
//
// ==/UserScript==

var css = "@namespace url(http://www.w3.org/1999/xhtml); .button{color:#000000}"
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

