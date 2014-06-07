// ==UserScript==
// @name           GooglePlusTwitter
// @namespace      GooglePlusTwitter
// @version        1
// @author         Qazuor
// @description    Show Google Plus post as tweets (collapsed) and expand its when user make a doble click
// @include        https://plus.google.com/
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

/**************************************************************************************************

Based on Script made for dotjs by mrspeaker
https://gist.github.com/1104347
**************************************************************************************************/



(function AddStylez() {
    var styleNode = document.createElement("style"),
        styleRule = ".a-f-i { \
height: 80px; \
overflow: hidden; \
-webkit-user-select: none; -moz-user-select: none; user-select: none; \
-webkit-mask-image: -webkit-gradient(linear, left 75, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0))); \
} \
.lil-a-f-i { \
height: auto; \
overflow: auto; \
-webkit-user-select: auto; -moz-user-select: auto; user-select: auto; \
-webkit-mask-image: none \
}";
    styleNode.setAttribute("type", "text/css");
    styleNode.setAttribute("media", "screen");
    styleNode.appendChild(document.createTextNode(styleRule));
    document.getElementsByTagName("head")[0].appendChild(styleNode);
})();

(function AddClickz() {
    $(".a-f-i").live("dblclick", function() {
        $(this).toggleClass("lil-a-f-i");
    });
})();