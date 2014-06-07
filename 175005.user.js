// ==UserScript==
// @name       Movie CSE for douban
// @namespace  http://www.einverne.tk
// @version    1.2
// @description  find useful movie download link from Google Custom Search Engine
// @match      http://movie.douban.com/subject/*
// @copyright  2012+, einverne
// ==/UserScript==

(function () {
    var nextpage_index = 0;
    var url;
    var keyword2;
    var cx = "013193653470345952139:rmavzl75vbq";
    var CSEFunction = function () {
        console.log("CSEFunction");
        var douban_url = this.location.href;
        var reg = /(\d{7,8})/g; //正則
        var douban_id = douban_url.match(reg); //獲取movie id
        var title = $('html head title').text();
        var keyword1 = title.replace('(豆瓣)', '').trim();
        keyword2 = encodeURIComponent(keyword1);
        var html_title_start = '<div id="movie_cse"><div class="da3" style="margin-bottom:0px;padding-bottom: 5px;"><h2 style="margin: 0">可下载的资源&nbsp; ·&nbsp;·&nbsp;<span class="pl">共有'
        var html_title_end = '条结果 (<a href="http://www.google.com/cse?cx=' + cx + '&q=' + keyword2 + '#gsc.tab=0&gsc.q=' + keyword2 + '&gsc.page=1" target="_blank">全部</a>)</h2></span></div>';
        var html_body_start = '<div class="indent csecontent" id="db-doulist-section" style="padding-left:5px;padding-right:5px;margin:0;border:1px #F4F4EC solid;"><ul class="bs">';
        var html_body_yes = '';
        var html_body_no = '<li>没有找到相关资源，手动去<a href="http://www.google.com/cse?cx=' + cx + '&q=' + keyword2 + '#gsc.tab=0&gsc.q=' + keyword2 + '&gsc.page=1" target="_blank">搜索</a></li>';
        var html_body_error = '<li>每日调用次数过多，手动去<a href="http://www.google.com/cse?cx=' + cx + '&q=' + keyword2 + '#gsc.tab=0&gsc.q=' + keyword2 + '&gsc.page=1" target="_blank">搜索</a></li>';
        var html_body_end = '</ul></div>';
        var html_body_nextpage = '<div class="indent" id="db-doubanlist-section" style="text-align: left; padding: 5px 5px 5px 10px;margin: 0"><button value="下一页" id="nextPageButton">下一页</button><span id="pager" style="float: right;padding-right: 10px;">第1页</span></b>';
        var html_body_endmore = '<div style="text-align:right; padding:5px 10px 5px 0px;"><a href="http://www.einverne.tk/2013/10/movie-cse-for-douban.html" target="_blank">反馈</a></div>';
        var html_body_endend = '</div></div>';
        url = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyAEPLlfl_OvTjYXc_-Vv7oKKVaBYEfl1kA&cx=013193653470345952139:rmavzl75vbq&alt=json&q=' + keyword2;
        var length = 30;
        $.ajax({
            type:'GET',
            //HTTP請求方法
            dataType:'json',
            //一旦獲取到數據,立刻當做腳本執行
            url:url,
            //獲取數據url
            success:function (data) {
                if (data.queries.request[0].totalResults > 0) {
                    var totalResults = data.queries.request[0].totalResults;
                    var html_title = html_title_start + totalResults + html_title_end;
                    nextpage_index = data.queries.nextPage[0].startIndex;
                    var items = data.items;
                    for (var i = 0; i < items.length; i++) {
                        var title = items[i].title;
                        var link = items[i].link;
                        html_body_yes += '<li><a href="' + link + '?from=douban" title="' + title + '" target="_blank">' + title + '</a></li>';
                    }
                    $('.aside').prepend(html_title + html_body_start + html_body_yes + html_body_end + html_body_nextpage + html_body_endmore + html_body_endend);
                    var b_nextpage = document.getElementById("nextPageButton");
                    b_nextpage.addEventListener('click', nextPage, false);
                } else {
                    $('.aside').prepend(html_title + html_body_start + html_body_no + html_body_end + html_body_endend);
                }
            },
            error:function (jqXHR, textStatus, errorThrown) {
                //console.log("error"+jqXHR.status+textStatus+errorThrown);
                //jqXHR.responseText.message
                $('.aside').prepend(html_title_start + "0" + html_title_end + html_body_start + html_body_error + html_body_end + html_body_endmore + html_body_endend);
            }
        });

        function nextPage() {
            console.log("nextPage" + nextpage_index);
            html_body_yes = "";
            url = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyAEPLlfl_OvTjYXc_-Vv7oKKVaBYEfl1kA&cx=013193653470345952139:rmavzl75vbq&alt=json&q=' + keyword2 + '&start=' + nextpage_index;
            $.ajax({
                type:'GET',
                //HTTP請求方法
                dataType:'json',
                //一旦獲取到數據,立刻當做腳本執行
                url:url,
                //獲取數據url
                success:function (data) {
                    console.log("success");
                    var pager = document.getElementById("pager");
                    pager.innerHTML = "第" + Math.floor(nextpage_index / 10 + 1) + "页";
                    if (data.queries.request[0].count > 0) {
                        nextpage_index = data.queries.nextPage[0].startIndex;
                        var items = data.items;
                        for (var i = 0; i < items.length; i++) {
                            var title = items[i].title;
                            var link = items[i].link;
                            html_body_yes += '<li><a href="' + link + '?from=douban" title="' + title + '" target="_blank">' + title + '</a></li>';
                        }
                        var html_body = html_body_start + html_body_yes + html_body_end;
                        $("#movie_cse>.csecontent").replaceWith(html_body);
                        //$('.aside').prepend(html_title + html_body_start + html_body_yes + html_body_end + html_body_endmore + html_body_endend);
                    } else {
                        //$('.aside').prepend(html_title + html_body_start + html_body_no + html_body_end + html_body_endend);
                    }
                }
            });
        }
    }

    function contentEval(source) {
        console.log("contentEval");
        // Check for function input.
        if ('function' == typeof source) {
            // Execute this function with no arguments, by adding parentheses.
            // One set around the function, required for valid syntax, and a
            // second empty set calls the surrounded function.
            source = '(' + source + ')();'
        }

        // Create a script node holding this  source code.
        var script = document.createElement('script');
        script.setAttribute("type", "application/javascript");
        script.textContent = source;

        // Insert the script node into the page, so it will run, and immediately
        // remove it to clean up.
        document.body.appendChild(script);
        document.body.removeChild(script);
    }

    contentEval(CSEFunction());
}());