// ==UserScript==
// @name		Search BaiduYun for Douban
// @namespace	http://lmbj.net
// @description 在豆瓣页面右上角显示百度云中相关的资源,修改自Chrome插件豆瓣+百度网盘™:http://t.cn/z8XPRJh 
// @include     http://*.douban.com/subject/*
// @grant		GM_xmlhttpRequest
// @updateURL   https://userscripts.org/scripts/source/177423.meta.js
// @downloadURL https://userscripts.org/scripts/source/177423.user.js
// @version		0.3 
// ==/UserScript==

var $ = unsafeWindow.$;
var keyword,dck,imgURL,html_title,html_body_start,url,html_body_end,toggle_more_button,url_final,submit_search;
keyword = document.title.replace( '(豆瓣)', '' ).trim();

dck = encodeURIComponent(keyword);
url='http://www.baidu.com/s?wd='+dck+'+site%3Apan.baidu.com';

html_title =  '<div id="dbbd" class="da3" style="margin-bottom:0px;padding-bottom:1px;background-color:#E9F3FA;">'
+ '<dl><dt style="display:inline;font-size:11px;color:#999">'
+ '<b style="color:#888">' + keyword + '</b> 的搜索结果· · ·</dt> [' 
+ '<a href="http://www.baidu.com/s?wd='+dck+'+site%3Apan.baidu.com" target="_blank">全部</a>'
+ ']<img style="float:right;margin-top:4px;cursor:pointer;opacity:0.3;" id="toggleIcon" src="http://img3.douban.com/pics/add-doulist.gif" title="试试其他关键字?">'
+ '<div id="baidu-search" style="display:none">'
+ '	<input id="query-keywords" type="text">'
+ '	<img id="searchIcon" src="http://img3.douban.com/pics/icon/bn_srh_1.png" style="cursor:pointer">'
+ '</div>'
+ '</dl></div>';
html_body_start = '<div class="indent" id="db-doulist-section" style="padding-left:5px;padding-right:5px;padding-bottom:8px;border:1px #F4F4EC solid;"><ul class="bs bdresult">'; 
html_body_end = '</ul></div>';
GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/html',
    },
    onload: function(response) {
        var i,data,content,tempTitle,tempURL;
        data = response.responseText;
        for(i = 1; i < 6; i ++){
            content = "#content_left table#" + i + " tr td.c-default div.c-abstract";
            tempTitle = $(content, data).text().replace("文件名:", "");
            tempURL = $("#content_left table#" + i + " tr td.c-default h3.t a", data).attr("href");
            if (tempTitle == "" && i == 1) {
                $("ul.bdresult").append('<li>哇哦~,可能是该资源过于冷门,什么都没找到呀...</li>');
            } else if (tempTitle != "") {
                $("ul.bdresult").append('<li><span class="badge badge-error"></span><a href='+tempURL+' target="_blank">' + tempTitle + '</li>');
            } else  {
                break;
            }
        }
    }
});

$('.aside').prepend( html_title + html_body_start + html_body_end);

toggle_more_button = document.getElementById("toggleIcon");
toggle_more_button.addEventListener("click", function() {
    $('#baidu-search').fadeToggle("fast");
}, false);

submit_search = document.getElementById("searchIcon");
submit_search.addEventListener("click", function() {
    var queryWords = $('#query-keywords').val();
    if(queryWords.trim() == ""){
        alert("请输入搜索关键字哦^_^");
    }else{
        url_final = 'http://www.baidu.com/s?wd=' + queryWords + '+site:pan.baidu.com';
        window.open(url_final);
    }
}, false);