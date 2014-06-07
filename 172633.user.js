// ==UserScript==
// @name       Phannikizer for funnyjunk
// @include     *funnyjunk.com*
// @version    2
// ==/UserScript==


(function() {
    var css = "\n.green_u { border-bottom: 1px dotted #ff6600; color: #ff6600; text-decoration: none; } .pink_u { color: #ff6600; } #contentLeft table.menu a { color: #ff6600; } .boardsMenu span { color: orange; } div.com div.r a { color: #ff6600!important; } div.com div.r a:hover { color: #ff6600!important; } .comPaginator a, div.paginator a { color: #ff6600; } #showCommentsOptions .selected { color: #ff6600!important; } a:hover { color: #ff6600; } a { color: #ff6600; } body { color: #ff6600; }#boards_bar a { color: #ff6600; } #contentLeft ul.menu1 a { color: #ff6600; } #contentLeft ul.menu a { color: #ff6600; } pinkLight { color: #ff6600; }\n}\n#contentRight .inner{\nbackground-image: url(\"http://i.imgur.com/tjwwh8y.png\") !important;\nbackground-repeat:no-repeat !important;\nbackground-position:center !important;\nbackground-attachment:fixed !important;\n}";
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