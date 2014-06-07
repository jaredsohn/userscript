// ==UserScript==
// @name           Hide Ads at Yahoo Dictionary
// @description    Hide Ads at Yahoo Dictionary
// @version        1
// @date           2011-10-03
// @author         Pulipuli Chen
// @namespace      http://pulipuli.blogspot.com/
// @include        http://tw.dictionary.yahoo.com/dictionary?p=*
// ==/UserScript==

(function (d, func) {
    var h = d.getElementsByTagName('head')[0];
    var s1 = d.createElement("script");
    s1.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
    s1.addEventListener('load', function() {
        var s2 = d.createElement("script");
        s2.textContent = "jQuery.noConflict();(" + func.toString() + ")(jQuery);";
        h.appendChild(s2);
    }, false);
    h.appendChild(s1);
})(document, function($) {
    // ここにメインの処理を書く
    $("#adbn_LREC").remove();
    $("#hot-keywords").remove();
});