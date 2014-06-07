// ==UserScript==
// @name        i博济
// @namespace   boji
// @description i博济
// @include     http://www.bojistudio.org/list/1*
// @include     http://www.bojistudio.org/node/*
// @version     1.1
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// @require     http://code.jquery.com/jquery-1.10.1.min.js
// ==/UserScript==

function processDouban() {
    var $vlist = $(".VideoList > .cls > li > .cls > .x > p > a");
    $vlist.each(function() {
        var name = $(this).text();
        var nameMatch = name.match(/\[.*\](.*)$/);
        if(nameMatch != null) {
            name = nameMatch[1];
        }
        
        $(document.createElement('a'))
        .css({float:'right', color:'red'})
        .text("<去百度影音看>")
        .attr('href', 'http://v.baidu.com/v?word=' + name + '&ie=utf-8')
        .appendTo($(this).parent());
        
        var $parent = $(this);
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://movie.douban.com/subject_search?search_text=' + name,
            onload: function(responseDetails) {
                rbody = $(responseDetails.responseText);
                rbody.find("#content > div > .article > div:eq(1) >table:eq(0)").each(function() {   
                    var $douban = $(this);
                    var link = $douban.find("tbody > tr > td:eq(0) > a").attr('href');
                    var value = $douban.find("tbody > tr > td:eq(1) > div > .star").text().replace(/\s/g,'');
                    $parent.parent().after("<p><a style = \"color:red;\" href=\"" + link + "\">豆瓣评分 : " + value + "</a></p>");
                });   
            }
        }
                         );
    });
}

function downloadList() {
    $(document.createElement('button'))
    .css("float", "right")
    .text("复制所有链接到剪贴板")
    .click(function() {
        var res = '';
        $(".s:eq(0) > .k > span.l > a").each(function(){
            res += $(this).attr('href') + '\n';
        });
        GM_setClipboard(res);
    }
          ).appendTo($('.DownBox:eq(0) > .bg > .t'));
}

function processNode(){
    var name = $('.info > div:eq(0)').text();
    name = name.match(/中文名：\[?(高清电影)?\]?(.+)$/)[2];
	//alert(name);
    
    $(document.createElement('a'))
    .css({float:'right', color:'red'})
    .text("<去百度影音看>")
    .attr('href', 'http://v.baidu.com/v?word=' + name + '&ie=utf-8')
    .appendTo($('.info > div:eq(0)'));
    
    var $parent = $('.info');
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://movie.douban.com/subject_search?search_text=' + name,
        onload: function(responseDetails) {
            rbody = $(responseDetails.responseText);
            rbody.find("#content > div > .article > div:eq(1) >table:eq(0)").each(function() {   
                var $douban = $(this);
                var link = $douban.find("tbody > tr > td:eq(0) > a").attr('href');
                var value = $douban.find("tbody > tr > td:eq(1) > div > .star").text().replace(/\s/g,'');
                $parent.append("<div><a style = \"color:red;\" href=\"" + link + "\">豆瓣评分 : " + value + "</a></div>");
            });   
        }
    }
                     );
}

$(document).ready(function() {  
    var url = window.location.href;
    if(/.+\/list\/1/.test(url)) {
        processDouban();
    }else if(/.+\/node\/.+/.test(url)) {
        downloadList();
        processNode();
    }
        });