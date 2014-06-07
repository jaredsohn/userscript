// ==UserScript==
// @name           Jump to Youku
// @description    Display a url to Youku instead of the embedded flash player.
// @author         hzqtc1229@gmail.com
// @include        *
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

(function() {
    $('embed').each(function() {
        var src = $(this).attr('src');
        var id = '';

        if (src.indexOf('static.youku.com') > 0) {
            var pattern = "VideoIDS=";
            var start = src.indexOf(pattern) + pattern.length;
            var end = src.indexOf('&', start);
            id = src.substring(start, end);
        }
        else if (src.indexOf('player.youku.com') > 0) {
            var pattern = "/sid/";
            var start = src.indexOf(pattern) + pattern.length;
            var end = src.indexOf('/', start);
            id = src.substring(start, end);
        }

        if (id.length > 0) {
            var url = 'http://v.youku.com/v_show/id_' + id + '.html';
            var par = $(this).parent();
            $('<a>').attr('href', url).attr('target', '_self').text(url).appendTo(par);
            $(this).remove();
        }
    });
})();