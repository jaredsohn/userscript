// ==UserScript==
// @author              Ferenc Nagy
// @name                Netbook Reader
// @description         Google Reader for Netbooks. This script removes all the whitespace from Google Reader and just gives you the news.
// @include             http://*.google.*/reader/*
// ==/UserScript==
// Netbook Reader


(function() {
var css = "#search {display: none !important;} #search-input{display:none !important;} #search-restrict{display:none !important;} #search-restrict-input{display:none !important;} #search-submit{display:none !important;} #chrome-header{display:none !important;} #global-info{display:none !important;} #gbar{display:none !important;} #guser{display:none !important;} .gbh{display:none !important;} #main{top: 0px} #logo-container{top: 7px;} #nav{padding-top: 35px;} #viewer-top-controls{padding: 2px 2px} #viewer-footer{padding: 2px 2px}";

if (typeof GM_addStyle != "undefined") {
    GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
    PRO_addStyle(css);
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
