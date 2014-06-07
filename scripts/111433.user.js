// ==UserScript==
// @name       What.CD Reverse Forum Title
// @description  What.CD Reverse Forum Title
// @include        http*://*what.cd/forums.php?*action=viewthread*
// @version 0.1
// ==/UserScript==

(function() {
    var t = document.title.substring('Forums > '.length);
    var g = ' > ';
    var i = t.indexOf(g);
    document.title = t.substring(i + g.length, t.length - ' :: What.CD'.length) + " < " + t.substring(0, i) + " < Forums :: What.CD";
})();