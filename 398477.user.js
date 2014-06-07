// ==UserScript==
// @name       Darker background

// @version    0.1
// @description  A darker FJ comment background
// @include         *funnyjunk.com/bronies/*
// @copyright  2014, josa on funnyjunk
// @require       http://code.jquery.com/jquery-1.7.js
// ==/UserScript==

(function() {
    var css = "#commentsList { background: url('http://i.imgur.com/95GNArQ.png') !important; }#contentRightTop { width: 0px!important; }";
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