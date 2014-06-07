// ==UserScript==
// @name        Funnyjunk OCD Pixel Fixer :)
// @namespace   Posttwo
// @description REMOVES THE FUCKING 4px THING
// @include     http://www.funnyjunk.com/*
// @version     1
// ==/UserScript==

(function() {
    var css = "\n#contentRightTop { width: 0px!important; }\n}";
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
 