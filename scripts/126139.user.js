// ==UserScript==
// @name           DMHY torrent address displayer
// @namespace      http://share.dmhy.org/topics/view/
// @include        http://share.dmhy.org/topics/view/*.html
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
    var _a = $("#tabs-1 a:first");
    var _href = _a.attr("href");
    _href = "http://share.dmhy.org" + _href;
    var _input = $("<input type='text' value='" + _href +  "' style='display:block;font-size:24pt;width:100%;' onfocus='this.select()' onclick='this.select()' />");
    _a.after(_input.clone());
    $('body').prepend(_input);
    _input.focus().select();
});