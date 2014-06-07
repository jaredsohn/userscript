// ==UserScript==
// @name           eBay Edit Item Save Sidebar
// @namespace      FreakBoyScript
// @description    Applies the Digg Sidebar idea to the Save and Continue Button on eBay listing revision pages.
// @include        http://*.ebay.com/ws/eBayISAPI.dll*
// @author       picardo edited by JohnTheJohnMan edited again by FreakBoy
//
// ==/UserScript==

var css = "@namespace url(http://www.w3.org/1999/xhtml); #aidZ1{ position: fixed !important; bottom: 10px !important; right: 10px !important; z-index:100; } #aidZ18{ position: fixed !important; bottom: 10px !important; right: 10px !important; z-index:100; }"
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

