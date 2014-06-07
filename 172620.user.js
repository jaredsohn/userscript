// ==UserScript==
// @name        Funnyjunk Comment Menu Fixer
// @namespace   Posttwo
// @description Thumbs in update
// @include     http://www.funnyjunk.com/*
// @version     2
// ==/UserScript==

(function() {
    var css = "\n#commentsList .com .r a, #commentsList .com .r .cmn_thumb { display: inline-block!important; }\n}";
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
 