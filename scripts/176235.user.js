// ==UserScript==
// @name            Fakku OnePage
// @author          hrroon
// @version         1.0
// @date            2013-08-20
// @namespace       http://userscripts.org/users/529104
// @description     Shows all pages at once in online view and allows keyboard navigation
// @include         http://www.fakku.net/doujinshi/*/read*
// @include         http://www.fakku.net/manga/*/read*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    $("head").append("<style>.mangaPage { margin: 20px; border: thin dashed #840525; }</style>");
    $.ajax({
        type: "GET",
        url: "#page=1",
        dataType: "html",
        async: false,
        success: function(data) {
            var imageURL = data.match("http://cdn.fakku.net/.*/images/") + "001.jpg";
            var numPages = $("select.drop").first().children().length - 1;
            $("#content").empty();
            $("#content").css("border", "none");
            for (var i = 1; i <= numPages; i++) {
                var num = ('000' + i).substr(-3);
                $("<img>").attr({
                    "src": imageURL.replace("001", num),
                    "class": "mangaPage"
                }).appendTo("#content");
            }
        }
    });
    headerHeight = 34;
    topOffsets = [0];
    $("img.mangaPage").each(function() {
        topOffsets.push($(this).offset().top - headerHeight);
    });
    $(document).keydown(function(e){
        if (e.keyCode == 37) {
            var tmp = topOffsets.filter(function(offset) { return offset < window.pageYOffset });
            if (tmp.length > 0) {
                scroll(0, Math.max.apply(Math, tmp))
            }
            return false;
        } else if (e.keyCode == 39) {
            var tmp = topOffsets.filter(function(offset) { return offset > window.pageYOffset });
            if (tmp.length > 0) {
                scroll(0, Math.min.apply(Math, tmp));
            }
            return false;
        }
    });
});