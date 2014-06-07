// ==UserScript==
// @name          Wikipedia ＫＫゴシック V1.0
// @description   Use a ＫＫ ゴシック font in Wikipedia.
// @include       http://*.wikipedia.org/*
// ==/UserScript==

(function () {
    var styles = "* {font-family:'ＫＫゴシック'}body {width:1024px}";
    var heads  = document.getElementsByTagName("head");
    if (heads.length > 0) {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(styles));
        heads[0].appendChild(node); 
    }
}) ();