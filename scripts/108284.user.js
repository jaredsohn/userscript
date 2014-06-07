// ==UserScript==
// @name           facebook navi to G+
// @namespace      userscripts.org
// @description    Replace navi button with G+ button. Japanese Only.
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @copyright      k_terase
// @website        http://userscripts.org/scripts/show/108284
// @version        1.2
// ==/UserScript==
(function (d, code) {
    var h = d.getElementsByTagName('head')[0];
    var s = d.createElement("script");
    s.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
    s.addEventListener('load', function() {
        var qw = d.createElement("script");
        qw.textContent = "jQuery.noConflict();(" + code.toString() + ")(jQuery);";
        h.appendChild(qw);
    }, false);
    h.appendChild(s);
})(document, function($) {
    var jqa = $("#headNav").find("a[href='http://f-navigation.jp/']");
    if(!jqa)
        return;

    var ap = {
        "href" : "https://plus.google.com/",
        "target" : "_blank",
        "title" : "Google+"
    }

    jqa.find("i").removeClass("sp_cqzp0v sx_ed7b61")
    .css("display", "inline-block")
    .css("height","16px")
    .css("width", "16px")
    .css("background", "url(http://ssl.gstatic.com/s2/oz/images/promos/mobile.png) no-repeat")
    .css("-webkit-background-size", "16px 16px")
    .css("-moz-background-size", "16px 16px")
    .css("-o-background-size","16px 16px");

    for(var k in ap) {
        jqa.prop(k, ap[k]);
    }

});