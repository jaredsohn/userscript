// ==UserScript==
// @name         人人影视（豆瓣电影评分）
// @namespace    YyetsViewDoubanMovieDb
// @include      *www.yyets.com/resource/*
// @author       WeTyped
// @description  View douban`s movie rating from Yyest.
// ==/UserScript==

if(window.chrome){//Chrome
var span = document.createElement('span');
span.setAttribute('onclick', 'return window;');
var unsafeWindow = span.onclick();
}

(function(jQuery){

function userFunc ($) {
    var title = $('h2.movie, h2.tv').find('strong').text();
    var result = title.match(/《.*?》/);
    if(result){
        title = result[0];
        var url = 'http://movie.douban.com/subject_search';
        $.ajax({
            url: url,
            data: {
                "search_text": title
            },
            dataType: 'text',
            beforeSend: function(){
                $('.r_d_info').append('<li id="doubanRate"><span>豆瓣评分：</span><label class="star">正在查询中...</label> <a href="#"></a></li>');
            },
            success: function(data){
                var $movie = $(data).find('.article tr.item td .pl2').first();
                var $douban = $('#doubanRate').find('.star');
                if($movie.length){
                    var star = $movie.find('.star .rating_nums').text();
                    var href = $movie.find('a').attr("href");
                    var title = $movie.find('a').text();
                    $douban.text(star).next().attr({href: href, title: title}).text('[查看链接]');
                }else
                    $douban.find('.star').text("未找到相关电影信息。");
            },
            error: function(xhr, status, e){
                $('#doubanRate').find('.star').text("查询出现错误。");
            }
        });
    }
}

if (typeof jQuery === 'function') {
    userFunc(jQuery);
}
else {
    add_jQuery (userFunc);
}

function add_jQuery (callbackFn) {
    var targ        = document.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    var scriptNode  = document.createElement ('script');
    scriptNode.src  = 'http://code.jquery.com/jquery-1.9.1.min.js';
    scriptNode.addEventListener ("load", function () {
        var scriptNode          = document.createElement ("script");
        scriptNode.textContent  = 'var gm_jQuery  = jQuery.noConflict (true);\n' + '(' + callbackFn.toString () + ')(gm_jQuery);';
        targ.appendChild(scriptNode);
    }, false);
    targ.appendChild(scriptNode);
}

})(typeof unsafeWindow.jQuery === "function" ? unsafeWindow.jQuery : false);