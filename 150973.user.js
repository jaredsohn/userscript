// ==UserScript==
// @author	  liyuance@gmail.com
// @name          北京科学技术大学图书馆豆瓣读书插件
// @namespace     http://lib.ustb.edu.cn/
// @description   豆瓣读书页面中显示图书馆借阅信息
// @version	      v1.0
// @include       http://book.douban.com/subject/*
// @exclude       http://movie.douban.com/
// @exclude       http://music.douban.com/
// @exclude       http://book.douban.com/
// @exclude       http://www.douban.com/*
// @exclude       http://9.douban.com/*
// @exclude       http://*.douban.com/subject/*/edit
// @exclude       http://*.douban.com/subject/*/update_image
// @exclude       http://*.douban.com/subject/*/edit?mine
// @exclude       http://*.douban.com/subject/*/new_version
// @exclude       http://*.douban.com/subject/*/offers
// @exclude       http://*.douban.com/subject/*/new_offer
// @exclude       http://*.douban.com/subject/offer/*/
// @exclude       http://*.douban.com/subject/*/cinema?view=ticket
// @exclude       http://*.douban.com/subject/*/doulists
// @exclude       http://*.douban.com/subject/*/all_photos
// @exclude       http://*.douban.com/subject/*/mupload
// @exclude       http://*.douban.com/subject/*/comments
// @exclude       http://*.douban.com/subject/*/reviews
// @exclude       http://*.douban.com/subject/*/new_review
// @exclude       http://*.douban.com/subject/*/group_collectors
// @exclude       http://*.douban.com/subject/*/discussion/
// @exclude       http://*.douban.com/subject/*/wishes
// @exclude       http://*.douban.com/subject/*/doings
// @exclude       http://*.douban.com/subject/*/collections
// ==/UserScript==

var title = document.title;
// subject title
var keyword1 = title.replace( '(豆瓣)', '' ).trim(); 
var keyword2 = encodeURIComponent( keyword1 );
// lib search url
var url_lib = 'http://lib.ustb.edu.cn:8080/opac/';
var url_search = 'http://lib.ustb.edu.cn:8080/opac/openlink.php?strText=' + keyword2 + '&strSearchType=title';

var html_title = '<div class="da3" style="margin-bottom:0px;padding-bottom:1px;"><img src="http://lib.ustc.edu.cn/lib/favicon.ico" width="15px;" height="15px;" style="margin-bottom:-2px;" /><b><a href="http://lib.ustb.edu.cn" target="_blank" style="font-size:medium">北京科学技术大学图书馆</a></b></div>';

var html_body_start = '<div class="indent" style="padding-left:5px;border:1px #F4F4EC solid;"><ul class="bs">';
var html_body_yes = '';
var html_body_no = '<li>本馆没有您检索的馆藏书目</li>';
var html_body_end = '</ul>';
// "more" button if the items has more than 5
var html_body_endmore = '<div style="text-align:right; padding:5px 10px 5px 0px;"><a href="http://lib.ustb.edu.cn:8080/opac/openlink.php?strText=' +     keyword2 + '&strSearchType=title" target="_blank">更多&hellip;</a></div>';
var html_body_endend = '</div>';

var divprepend = function(cls,innerhtml){
    var obj = document.createElement("div");
    var clsobj = document.getElementsByClassName(cls)[0];
    var fstchild = clsobj.firstElementChild;

    obj.innerHTML = innerhtml;
    fstchild.parentNode.insertBefore(obj,fstchild)
}

var extractinfo = function(responsetext){
    var regtitlenav  = new RegExp("检索条件：题名=<font color=\"red\">(.*)</font>\\s+</font>\\s+结果数：<strong class=\"red\">(\\d+)</strong>");
    var mtitlenav = regtitlenav.exec(responsetext);
    
    if(mtitlenav == null){
        return {
            title: null,
            count:  0,
            bookitems : null
        };
    }
    else{
        var regbookitems = new RegExp("<div class=\"list_books\" id=\"list_books\">\\s+<h3><span class=\"doc_type_class\">(.*)</span><a href=\"(.*)\">\\d\.(.*)</a>\\s+(.*)\\s+</h3>\\s+<p>\\s+<span><strong>馆藏复本：</strong>(\\d+) <br />\\s+<strong>可借复本：</strong>(\\d+) </span>\\s+(.*)<br />\\s+(.*)\\s+</p>\\s+</div>","g");
        var mbookitems;
        var bookitems = [];
        var title = mtitlenav[1];
        var count = mtitlenav[2];
        while( (mbookitems = regbookitems.exec(responsetext)) !== null)
        {
            bookitems.push({
                doc_type:       mbookitems[1],
                book_url:       mbookitems[2],
                book_title:     mbookitems[3],
                book_id:        mbookitems[4],
                book_amount:    mbookitems[5],
                book_available:  mbookitems[6],
                book_author:    mbookitems[7],
                book_press:     mbookitems[8],
            });
        }

        return {
            title: title,
            count: count,
            bookitems: bookitems
        };

    }
}

GM_xmlhttpRequest({
    method: 'GET',
    url: url_search,
    onload: function(responseDetails) {
        var bookinfo = extractinfo(responseDetails.responseText);
        if(bookinfo.count > 0){
            html_body_yes += '<li>题名： <strong>' + keyword1 + '</strong><span style="margin-left:10px"> 结果数： <strong>' + bookinfo.count + '</strong></span</li>';

            for(var i = 0; i < bookinfo.count; i++){
                var bookitem = bookinfo.bookitems[i];
                html_body_yes += '<li> <a href="' + url_lib + bookitem.book_url + '" target="_blank">' + bookitem.book_title + '</a><span style="margin-left:10px">' + bookitem.book_id + '</span><br/>' + '<span class="pl" style="margin-left: 20px">馆藏复本: ' + bookitem.book_amount + '<span style="margin-left:20px">可借复本： ' + bookitem.book_available + '</span></span><br/><span class="pl" style="margin-left:20px">' + bookitem.book_author + '<span style="margin-left:10px">' + bookitem.book_press + '</span></span></li>';
                if(i >= 4)
                    break;
            }

            if(bookinfo.count > 5)
                divprepend('aside',html_title+html_body_start+html_body_yes+html_body_end+html_body_endmore+html_body_endend);
            else
                divprepend('aside',html_title+html_body_start+html_body_yes+html_body_end+html_body_endend);
        }
        else{
            divprepend('aside',html_title+html_body_start+html_body_no+html_body_end+html_body_endend);
        }
    }
});