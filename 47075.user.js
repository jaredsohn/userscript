// ==UserScript==
// @name          Anon spam hidder
// @description   Hides spam
// @include       http://2-ch.ru/*
// ==/UserScript==
(function() {
var css = "blockquote { max-height:250px; overflow: auto; }";
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
})();
~                                                                                                                                                                                                                   
~                                                                                                                                                                                                                   
~                                         