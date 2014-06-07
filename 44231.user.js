// ==UserScript==
// @name           new mail by ad1
// @namespace      http://www. fuck-durov.ru /
// @include        http://vkontakte.ru/*
// ==/UserScript==

var css=".mailbox table tr.newRow {background-color: #eee5b8 }";
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







