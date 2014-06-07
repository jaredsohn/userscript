// ==UserScript==
// @name        osuReplaceDownloadLinkToKoreaSite
// @namespace   myon
// @description 转换osu搜索页面下载链接到棒子网，破除下载限制 + 批量下载功能
// @include     https://osu.ppy.sh/p/*
// @include     https://osu.ppy.sh/s/*
// @include     http://osu.ppy.sh/p/*
// @include     http://osu.ppy.sh/s/*
// @include     http://osu.ppy.sh/b/*
// @include     https://osu.ppy.sh/b/*
// @version     2014.3.22
// ==/UserScript==

var $ = unsafeWindow.$;
var sLink = "http://bloodcat.com/osu/m/";
var is_login=$('.login-open-button').length==0;

//详细页面
if ($('.beatmapDownloadButton a').length) {
    $('.beatmapDownloadButton a').each(function(){
        var num=location.href.match(/[^\d]*(\d+).*$/)[1];
        //替换链接，如果是未登录状态则顺带替换图片
        if($(this).attr('href').match(/[^n]$/))
        {
            $(this).attr('href', sLink + num)
                    .attr('onclick','')
                        .find('img')
                        .attr('src','//s.ppy.sh/images/osu-download-beatmap.png');
        }
    });
    throw(0);
}

function beatmap(name, href) {
    this.name = name;
    this.href = href;
}
var beatmaplist = [];

//搜索页面下载链接转换
$('.beatmap').each(function() {
    var num = this.id;
    var href = sLink + num;
    if(is_login)
        $(this).find('a.require-login').eq(0).attr('href',href);
    else
    {
        $(this).find('a.require-login').click(function(e)
        {
            e.preventDefault();
            location.href=href;
        });
    }
});


//请求页面获取下载列表
function getbmps(url, count) {
    GM_xmlhttpRequest({
        url: url,
        method: 'get',
        onload: function(res) {
            var $html = $(res.responseText);
            $html.find('.beatmap').each(function() {
                var songName = $(this).find('.maintext').text();
                var num = this.id;
                var href = sLink + num;
                if (beatmaplist.length < count) {
                    beatmaplist.push(new beatmap(songName, href));
                }
            });
            var next = $html.find('.pagination b').next().attr('href');
            $('title').html(beatmaplist.length + '/' + count);
            if (next && beatmaplist.length < count) {
                var turl = 'https://osu.ppy.sh' + next;
                console.log(next);
                console.log(beatmaplist.length);
                //递归调用
                getbmps(turl, count);
            } else {
                $('title').html('数据请求完成');
                showDownloadPage();
            }
        }
    });
}

//输出下载链接
function showDownloadPage() {
    var html = '';
    var is_text = confirm("是否純文本形式(便于复制到下载工具批量下载)？\n否为链接形式");
    for (var i = 0; i < beatmaplist.length; i++) {
        if (is_text)
            html = html + beatmaplist[i].href + '<br/>';
        else
            html = html + (i + 1) + '. <a href="' + beatmaplist[i].href + '">' + beatmaplist[i].name + '</a><br/>';
    }
    $('body').html(html);
}
//注册GM命令
GM_registerMenuCommand("ous批量下载", function() {
    $('body').html('').attr('style', 'background:none !important;');
    beatmaplist = [];
    var count = prompt("输入要下载的数量(不填为下载所有搜索结果)");
    count = count ? count : Infinity;
    getbmps(location.href, count);
});
