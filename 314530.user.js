// ==UserScript==
// @name        Funnyjunk Avatar Border Go Away
// @namespace   Posttwo
// @description Guess
// @include     *.funnyjunk.com/*
// @version     1
// ==/UserScript==

(function() {
    var css = "\n#commentsList .av, div.noavatar, #commentsList_mp .av { border: 0px; }\n}";
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
 