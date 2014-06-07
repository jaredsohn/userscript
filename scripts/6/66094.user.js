// ==UserScript==
// @name           Multiply Ad Remover
// @namespace      sipp11_@_gmail_._com
// @description    remove ad from multiply page
// @include        http://*.multiply.com/*
// @include        http://multiply.com/*
// @scriptsource   http://userscripts.org/scripts/show/66094
// ==/UserScript==


var css = "@namespace url(http://www.w3.org/1999/xhtml); .adbox, .adlabel, .ad300, #footer, #pageend, #ownedfooterc, #banneradholder { display: none !important; }";
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
