// ==UserScript==
// @name          中国科学技术大学图书馆豆瓣读书及荐购插件
// @namespace     http://lib.ustc.edu.cn/
// @description   豆瓣读书页面中显示图书馆借阅信息 改自http://userscripts.org/scripts/show/138107 在检索到没有相关图书时，提供“荐书”的链接，通过点击该链接即可完成荐书。 
// @version	      v1.7
// @grant 	GM_xmlhttpRequest
// @grant 	GM_log
// @grant   GM_openInTab
// @include       http://book.douban.com/subject/*
// ==/UserScript==

var sel = function(selector) {
    return document.getElementById(selector);
}

var title = document.title;

//获取书的详细信息bookDetail，并去除bookDetail内部的空白字符，方便正则表达式的书写
var info = sel("info")
var bookDetail = info.textContent

var regSpace = /\s/g;
var bookDetail = bookDetail.replace(regSpace, "")
//GM_log(bookDetail)

//利用正则从bookDetail中取出所需的书的相关信息
var reg = /.*ISBN:(\d+)/
var result = reg.exec(bookDetail)
var isbn;

if(result)
{
    isbn = result[1]
    //GM_log(isbn)

}

// subject title
var keyword1 = title.replace( '(豆瓣)', '' ).trim(); 
var book_title = encodeURIComponent( keyword1 );


// lib search url
var url_lib = 'http://opac.lib.ustc.edu.cn/opac/';
var url_search = 'http://opac.lib.ustc.edu.cn/opac/openlink.php?strText=' + book_title + '&strSearchType=title';
var url_isbn_search = 'http://opac.lib.ustc.edu.cn/opac/openlink.php?strText=' + isbn + '&strSearchType=isbn';


var html_title = '<div class="da3" style="margin-bottom:0px;padding-bottom:1px;"><img src="http://lib.ustc.edu.cn/lib/favicon.ico" width="15px;" height="15px;" style="margin-bottom:-2px;" /><b><a href="http://lib.ustc.edu.cn" target="_blank" style="font-size:medium">中国科学技术大学图书馆</a></b></div>';

var html_recommend_title = '<div class="da3" style="margin-bottom:0px;padding-bottom:1px;"><img src="http://lib.ustc.edu.cn/lib/favicon.ico" width="15px;" height="15px;" style="margin-bottom:-2px;" /><b><a href="http://lib.ustc.edu.cn" target="_blank" style="font-size:medium">中国科学技术大学图书馆</a></b></div>';

var html_body_start = '<div id = "ustc_search_result_html" class="indent" style="padding-left:15px;border:1px #F4F4EC solid;"><ul class="bs">';
var html_body_isbn_start = '<div id = "ustc_isbn_search_result_html" class="indent" style="padding-left:15px;border:1px #F4F4EC solid;"><ul class="bs">';
//var html_body_yes = '';
var html_body_no = '<li>本馆没有您检索的馆藏书目(ISBN查询得到)</li>';

var html_body_end = '</ul>';
// "more" button if the items has more than 5
var html_body_endmore = '<div style="text-align:right; padding:5px 10px 5px 0px;"><a href="http://opac.lib.ustc.edu.cn/opac/openlink.php?strText=' +     book_title + '&strSearchType=title" target="_blank">更多&hellip;</a></div>';
var html_body_endend = '</div>';

var html_body_empty = '<div></div>';

var html_recommend_book = '<li> <a id="ustc_recommend_book" href="" target="_blank">推荐购书</a><span style="margin-left:10px">'

var divprepend = function(cls,innerhtml,div_id,div_class){
    var obj = document.createElement("div");
    obj.setAttribute('id', div_id);
    obj.setAttribute('class', div_class);
    var clsobj = document.getElementsByClassName(cls)[0];
    var fstchild = clsobj.firstElementChild;

    obj.innerHTML = innerhtml; 
    fstchild.parentNode.insertBefore(obj,fstchild)
}


//把检索书目和推荐图书放在两个具有不同id的div标签里，方便对他们进行操作
//添加所需的div标签，以后只对这里添加的标签进行修改
divprepend('aside',html_body_empty,'ustc_lib', 'ustc_lib');
divprepend('ustc_lib',html_body_empty,'ustc_recommend', 'ustc_recommend');


divprepend('ustc_lib',html_body_empty,'ustc_search_result', 'ustc_search_result');

divprepend('ustc_recommend',html_body_start+html_recommend_book+html_body_end+html_body_endend);
divprepend('ustc_search_result',html_title+html_body_isbn_start+html_body_endend+html_body_start+html_body_endend);
sel('ustc_recommend').style.display = "none";

//添加快捷键Alt+A来完成荐书操作。
document.onkeydown = function(event)
{
    if(event.keyCode == 65 && !event.ctrlKey && event.altKey && !event.shiftKey)
    {
        //GM_log("Here!");
        var url_href = sel('ustc_recommend_book').href;
        GM_openInTab(url_href);
        event.preventDefault();
    }
}

/*
 * type指的是查询的方式，是通过题名，还是ISBN
*/
var extractinfo = function(responsetext, type){

    //GM_log("in extractinfo type");
    if(type == 'title')
    {
        //var regtitlenav = new RegExp("<p style=\"font-size:14px;\">检索到\\s*<strong\\s*class=\"red\">(\\d+)</strong>\\s*条\\s*检索条件：题名=<font color=\"red\">(.*)</font>\\s*</font>\\s*的结果");
        var regtitlenav = /.*检索到\s+<strong\s+class="red">(\d+)<\/strong>\s+条\s+题名=<font\s+color="red">(.*)<\/font>\s+<\/font>\s+的结果.*/;
    }
    else if(type == 'isbn')
    {
        //var regtitlenav  = new RegExp("检索条件：ISBN/ISSN=<font color=\"red\">(.*)</font>\\s+</font>\\s+结果数：<strong class=\"red\">(\\d+)</strong>");
        var regtitlenav = /.*检索到\s+<strong\s+class="red">(\d+)<\/strong>\s+条\s+ISBN\/ISSN=<font\s+color="red">(\d+)<\/font>\s+<\/font>\s+的结果.*/;
        //GM_log("in ibsn type");
    }
    var mtitlenav = regtitlenav.exec(responsetext);
    
    //GM_log(mtitlenav[0]);
    //GM_log(mtitlenav[1]);
    //GM_log(mtitlenav[2]);

    if(mtitlenav == null){
        return {
            title: null,
            count:  0,
            bookitems : null
        };
    }
    else{
        //var regbookitems = new RegExp("<div class=\"list_books\" id=\"list_books\">\\s+<h3><span class=\"doc_type_class\">(.*)</span><a href=\"(.*)\">\\d\.(.*)</a>\\s+(.*)\\s+</h3>\\s+<p>\\s+<span><strong>馆藏复本：</strong>(\\d+) <br />\\s+<strong>可借复本：</strong>(\\d+) </span>\\s+(.*)<br />\\s+(.*)\\s+</p>\\s+</div>","g");

        var regbookitems = /<h3><span>(.*)<\/span><a href="(.*)"\s*>\d+\.(.*)<\/a>\s*(.*)\s*<\/h3>\s*<p>\s*<span>馆藏复本：(\d+)\s*<br>\s*可借复本：(\d+)\s*<\/span>\s*(.*)\s*<br \/>\s*(.*)\s<br \/>/g;
        var mbookitems;
        var bookitems = [];
        var title = mtitlenav[2];
        var count = mtitlenav[1];

        while( (mbookitems = regbookitems.exec(responsetext)) !== null)
        {
            //GM_log(mbookitems[0])
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



var url = document.URL;

var douban_id = url.split('/')[4]

var douban_api_url= 'https://api.douban.com/v2/book/'+ douban_id

GM_xmlhttpRequest({
    method: 'GET',
    url: douban_api_url,
    onload: function(responseDetails) {
        var book_detail_json = responseDetails.responseText;
    	var book_detail = JSON.parse(book_detail_json);
    	var title = book_detail["title"];
    	var author = book_detail["author"];
    	var isbn = book_detail["isbn13"];
    	var pub = book_detail["publisher"];
    	var date = book_detail["pubdate"];
        var type = 'C';
        var test_type = /9787\d{9}/;
        if(!test_type.test(isbn))
        {
            //GM_log("Matched!!")
            type = 'U';
        }
    	var url_recommend = 'http://opac.lib.ustc.edu.cn/asord/asord_redr.php?click_type=commit&title=' + keyword1 + '&a_name=' + author +'%8B&b_pub=' + pub + '&b_date=' + date + '&b_type='+ type + '&b_isbn=' + isbn;
        sel('ustc_recommend_book').href = url_recommend;
    }
}); 


GM_xmlhttpRequest({
    method: 'GET',
    url: url_search,
    onload: function(responseDetails) {
        //GM_log(responseDetails.responseText)
        var bookinfo = extractinfo(responseDetails.responseText, 'title');
        GM_log(bookinfo.count);
        if(bookinfo.count > 0){
            //sel('ustc_recommend').style.display = "none";

            var html_body_yes = '<li>题名： <strong>' + keyword1 + '</strong><span style="margin-left:10px"> 结果数： <strong>' + bookinfo.count + '</strong></span</li>';

            for(var i = 0; i < bookinfo.count; i++){
                var bookitem = bookinfo.bookitems[i];
                html_body_yes += '<li> <a href="' + url_lib + bookitem.book_url + '" target="_blank">' + bookitem.book_title + '</a><span style="margin-left:10px">' + bookitem.book_id + '</span><br/>' + '<span class="pl" style="margin-left: 20px">馆藏复本: ' + bookitem.book_amount + '<span style="margin-left:20px">可借复本： ' + bookitem.book_available + '</span></span><br/><span class="pl" style="margin-left:20px">' + bookitem.book_author + '<span style="margin-left:10px">' + bookitem.book_press + '</span></span></li>';
                if(i >= 4)
                    break;
            }

            if(bookinfo.count > 5)
                sel('ustc_search_result_html').innerHTML = html_body_yes+html_body_end+html_body_endmore;
            else
                sel('ustc_search_result_html').innerHTML = html_body_yes+html_body_end;
        }
        else{
            //sel('ustc_recommend').style.display = "block";
            //sel('ustc_search_result_html').innerHTML = html_body_no+html_body_end;
        }
    }
}); 


//根据ISBN查询图书，并放在最前面
GM_xmlhttpRequest({
    method: 'GET',
    url: url_isbn_search,
    onload: function(responseDetails) {
        var bookinfo = extractinfo(responseDetails.responseText, 'isbn');
        if(bookinfo.count > 0){
            sel('ustc_recommend').style.display = "none";

            var html_body_yes = '<li>ISBN: <strong>' + isbn + '</strong><span style="margin-left:10px"> 结果数： <strong>' + bookinfo.count + '</strong></span</li>';

            for(var i = 0; i < bookinfo.count; i++){
                var bookitem = bookinfo.bookitems[i];
                html_body_yes += '<li> <a href="' + url_lib + bookitem.book_url + '" target="_blank">' + bookitem.book_title + '</a><span style="margin-left:10px">' + bookitem.book_id + '</span><br/>' + '<span class="pl" style="margin-left: 20px">馆藏复本: ' + bookitem.book_amount + '<span style="margin-left:20px">可借复本： ' + bookitem.book_available + '</span></span><br/><span class="pl" style="margin-left:20px">' + bookitem.book_author + '<span style="margin-left:10px">' + bookitem.book_press + '</span></span></li>';
                if(i >= 4)
                    break;
            }

            if(bookinfo.count > 5)
                sel('ustc_isbn_search_result_html').innerHTML = html_body_yes+html_body_end+html_body_endmore;
            else
                sel('ustc_isbn_search_result_html').innerHTML = html_body_yes+html_body_end;
        }
        else{
            sel('ustc_recommend').style.display = "block";
            sel('ustc_isbn_search_result_html').innerHTML = html_body_no+html_body_end;
        }
    }
}); 
