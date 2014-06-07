// ==UserScript==
// @name           yyets.com get douban
// @description    在 yyets.com 影视详情页面显示该电影的豆瓣搜索结果，看评分。
// @namespace      yyets
// @include        http://www.yyets.com/php/resource/*
// http://img3.douban.com/js/packed_jquery.min6301986802.js
// http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @copyleft       Wooooo
// @version        1.2.2
// history
// 1.1.0 代码精简，去除不必要的 html/css
// 1.2.0 yyets 改版
// 1.2.1 修正电视剧查询结果
// 1.2.2 纯提醒：Firefox 17+ 请升级 Greasemonkey (经验证 1.5 是好的，https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/versions/)
// ==/UserScript==

$ = unsafeWindow.jQuery;

(function(){
    // get movie title
    var movieTitle = "";
    $('div.box_1.r_d_box h2 strong').each(function(){ movieTitle += $(this).text(); });

    movieTitle = movieTitle.substring(movieTitle.indexOf("《")+1, movieTitle.indexOf("》"));

    // {background:none repeat-x scroll 0 0 #FF7E00;}
        $('head').append("<style type='text/css'>\n" +
" #douban .itemTit{background:-moz-radial-gradient(center bottom , #FF0000, transparent) repeat scroll 0 0%, -moz-linear-gradient(center top , #545454 48%, #333333 49%, #000000 85%, #333333) repeat scroll 0 0 transparent !important;}\n" +
" #douban table{border-bottom: 1px dotted #AAAAAA;}\n" +
" .clearfix:after{content:'.';display:block;height:0;clear:both;visibility:hidden}\n" +
" .clearfix{zoom:1;display:inline-block;_height:1px}\n" +
" *html .clearfix{height:1%}\n" +
" *+html .clearfix{height:1%}\n" +
" .clearfix{display:block}\n" +
" .pl{font:12px Arial,Helvetica,sans-serif;line-height:150%;color:#666}\n" +
" .pl2{font:14px Arial,Helvetica,sans-serif;line-height:150%;color:#666}\n" +
" .gact{color:#bbb;font-size:12px;text-align:center;cursor:pointer}\n" +
" .gact a:link,a.gact:link{color:#bbb;font-size:12px;text-decoration:none;text-align:center}\n" +
" .gact a:visited,a.gact:visited{color:#bbb;font-size:12px;text-decoration:none;text-align:center}\n" +
" .gact a:hover,a.gact:hover{color:#fff;font-size:12px;border-left:1px solid #f99;border-top:1px solid #f99;border-right:1px solid #f33;border-bottom:1px solid #f33;background-color:#733;text-align:center}\n" +
" .infobox a.gact:link,.infobox a.gact:visited,.infobox .gact a:link,.infobox .gact a:visited{border-color:#fff6ee}\n" +
" .infobox a.gact:hover,.infobox .gact a:hover{border-color:#f99 #f33 #f33 #f99}\n" +
" .starstop{float:left;background:url(http://img3.douban.com/pics/all_star.gif);display:block;width:50px;height:14px;margin:1px 0 0 7px}\n" +
" .sub_ins .starstop{float:none;width:50px;display:inline;position:absolute}\n" +
" .stars{display:-moz-inline-block;display:inline-block;background:url(http://img3.douban.com/pics/stars.gif);width:50px;height:14px;margin:1px 0 0 7px}\n" +
" .stars4{background-position:left 61px}\n" +
" .stars3{background-position:left 45px}\n" +
" .stars2{background-position:left 30px}\n" +
" .stars1{background-position:left 15px}\n" +
" .thumblst .thumb .pl{padding:2px;border:1px solid #ddd;margin-bottom:6px;background:#fff}\n" +
" .allstar50,.allstar45,.allstar40,.allstar35,.allstar30,.allstar25,.allstar20,.allstar15,.allstar10,.allstar05{display:inline-block;*display:inline;*zoom:1;height:12px;overflow:hidden;width:55px;font:12px/1 tahoma;background:url(http://img3.douban.com/pics/allstar.gif) no-repeat 0 0;margin-bottom:7px}\n" +
" .allstar50{background-position:0 0}\n" +
" .allstar45{background-position:0 -12px}\n" +
" .allstar40{background-position:0 -24px}\n" +
" .allstar35{background-position:0 -36px}\n" +
" .allstar30{background-position:0 -48px}\n" +
" .allstar25{background-position:0 -60px}\n" +
" .allstar20{background-position:0 -72px}\n" +
" .allstar15{background-position:0 -84px}\n" +
" .allstar10{background-position:0 -96px}\n" +
" .allstar05{background-position:0 -108px}\n" +
" .movie_headerline .allstar50,.movie_headerline .allstar45,.movie_headerline .allstar40,.movie_headerline .allstar35,.movie_headerline .allstar30,.movie_headerline .allstar25,.movie_headerline .allstar20,.movie_headerline .allstar15,.movie_headerline .allstar10,.movie_headerline .allstar05,.star .allstar50,.star .allstar45,.star .allstar40,.star .allstar35,.star .allstar30,.star .allstar25,.star .allstar20,.star .allstar15,.star .allstar10,.star .allstar05{float:left;margin-top:3px}\n" +
" .clearfix:after{content:'.';display:block;height:0;clear:both;visibility:hidden}\n" +
" .clearfix{zoom:1;display:inline-block;_height:1px}\n" +
" *html .clearfix{height:1%}\n" +
" .clearfix{display:block}\n" +
" .rating_num{color:red;font-size:14px;line-height:18px;padding:0 0 0 8px}\n" +
" .rating_nums{color:#ff5138;font-size:10px;padding:0 5px 0 0}\n" +
"  </style>");

    $('div#tabs').after("<div class='blank'></div> <div id='douban' class='box_4'> <div class='itemTit'><h2 style='color:#fff'>还是豆瓣的评分靠谱</h2></div> </div> <div class='blank'></div>");

    GM_xmlhttpRequest
    (
        {
            method: "GET",
            url: "http://movie.douban.com/subject_search?search_text=" + movieTitle + "&cat=1002",
            onload: function(response)
            {
                var doubanResponse = response.responseText;

                // console.log("http://movie.douban.com/subject_search?search_text=" + movieTitle + "&cat=1002");
                // console.log(doubanResponse);

                $("#douban").append($(doubanResponse).find('div[class=article]'));

                if ($("#douban div[class=article]").html().trim().length > 0)
                {
                    // change style
                    $("#douban").css("background-color", "#f3f3f3");
                    $("#douban").css("overflow", "auto");
                    $("#douban").css("min-height", "220px");
                    $("#douban").css("max-height", "220px");
                    $("#douban .article").css("border", "1px solid #BBBBBB");
                    $("#douban #content").css("min-height", "0px");
                    $("#douban #wrapper").css("width", "700px");
                    $("#douban .bd").css("width", "80%");
                    // change behavior: open link in new tab
                    $("#douban .pl2 a").attr("target", "_blank");
                }
            }
        }
    );

}());

