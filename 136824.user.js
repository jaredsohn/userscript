// ==UserScript==
// @name           Youku Sucks
// @description    Display a list of video URLs and remove the flash player in Youku.
// @author         hzqtc1229@gmail.com
// @include        http://v.youku.com/v_show/id_*.html*
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

(function() {
    function loadVideoList(url, type) {
        $('#player p').remove();

        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://www.flvcd.com/parse.php?kw=' + escape(url) + '&format=' + type,
            onload: function(res) {
                var doc = GM_safeHTMLParser(res.responseText);
                var eles = GM_xpath({
                    path: '//x:td[contains(@class, "STYLE4")]/x:a[@target="_blank"]',
                    all: true,
                    node: doc,
                    resolver: "http://www.w3.org/1999/xhtml"
                });
                $(eles).each(function() {
                    $('<p>').text($(this).attr('href')).appendTo($('#player'));
                });
            }
        });
    }

    $('#player object').remove();
    $('#player').css({'height': 'auto', 'text-align': 'center'});

    var url = $(location).attr('href');
    $('<button>').text('标清').click(function() {
        loadVideoList(url, 'normal');
    }).appendTo($('#player'));
    $('<button>').text('高清').click(function() {
        loadVideoList(url, 'high');
    }).appendTo($('#player'));
    $('<button>').text('超清').click(function() {
        loadVideoList(url, 'super');
    }).appendTo($('#player'));

    loadVideoList(url, 'super');
})();