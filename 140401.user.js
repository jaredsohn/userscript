// ==UserScript==
// @name           Replace Google map
// @namespace      http://d.hatena.ne.jp/tech-kazuhisa/
// @include        http://www.flickr.com/photos/*
// ==/UserScript==
(function (d, func) {
    var h = d.getElementsByTagName('head')[0];
    var s1 = d.createElement("script");
    s1.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
    s1.addEventListener('load', function () {
        var s2 = d.createElement("script");
        s2.textContent = "jQuery.noConflict();(" + func.toString() + ")(jQuery);";
        h.appendChild(s2);
    }, false);
    h.appendChild(s1);
})(document, function ($) {
    // ここにメインの処理を書く
    $(document).ready(function ($) {
        var uri = $('#photo-story-map-zoom-street');
        clat = uri.attr('src').match(/clat=[0-9]*\.[0-9]*/).toString().replace(/^clat=/, '');
        clon = uri.attr('src').match(/clon=[0-9]*\.[0-9]*/).toString().replace(/^clon=/, '');
        var google_map_link = $("<a/>").attr({
            "href": "https://maps.google.co.jp/maps?q=" + clat + "," + clon + "(" + $("#title_div").text() + ")&hl=ja",
            "target": "_blank"
        });
        google_map_link.html("[View GoogleMap]");
        $('#photo-story-story').append("<p>");
        $('#photo-story-story').append(google_map_link);
    });
});