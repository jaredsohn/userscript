// ==UserScript==
// @name        douban_tjnu
// @namespace   douban_tjnu
// @include     http://book.douban.com/subject/*
// @version     3.2
//
// @author			freetstar89@gmail.com
// ==/UserScript==

if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery; 
}

var thisScript = {
name: "douban_tjnulib", 
id: "140958", 
version:"1" 
}


var searchurl;
var indexurl='http://211.81.31.34/uhtbin/cgisirsi/x/0/0//57/49?user_id=LIBNORMAL&password=LIBNO';
var isbn=null;

function insertloading(){
    var htmlstr = '<div id="libinfo" class="gray_ad"><h2>天津师范大学图书馆信息查询</h2></div>';
    $('.aside').prepend(htmlstr);
}

	
//获取title和isbn号码
function page_subject(){
    //insert load info
    insertloading();
	// 获取书籍名称
	title = $('h1>span').text();
	//title = encodeURI(title);
	$('span.pl').each(function(i){
		if ($(this).text() == 'ISBN:'){
			isbn = $(this)[0].nextSibling.nodeValue;
			isbn = isbn.substr(1,13);
            isbnlinker();
		}
	});
}

//代码开始的地方
$(document).ready(function(){
    page_subject();
});

function isbnlinker(){
   setTimeout(function(){GM_xmlhttpRequest({
    method: 'GET',
    url: indexurl,
    overrideMimeType:'text/html;charset=utf-8',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        var data=responseDetails.responseText;
        var $search_page = $(data);
        $search_page.find('form').each(function(){
            if($(this).attr('name')==="searchform"){
                searchurl = $(this).attr("action");
            }
        });
        getBookInfo();
        }
})},500);
}


function getBookInfo(){
 
   setTimeout(function(){GM_xmlhttpRequest({
    method: "POST",
    url: "http://211.81.31.34"+searchurl,
    data: 'searchdata1='+isbn+'&srchfield1=GENERAL^SUBJECT^^^所有字段&sort_by=TI&library=师范大学',
    overrideMimeType:'text/html;charset=utf-8',
    headers: {
          "Content-Type": "application/x-www-form-urlencoded",
    },
    onload: function(responseDetails) {
        var responses=responseDetails.responseText;
        var $search_page = $(responses);
        //图书馆中没有这本书哦，亲
        if(responses.indexOf("目录中没有发现此文献")!=-1)
       {
            $("#libinfo").append("图书馆木有这本书啊");
            $("#libinfo").append("</br>there are 2 chances");
            $("#libinfo").append("</br>要么这本书年代久远，管理员没有更新此书的ISBN号");
            $("#libinfo").append("</br>要么就是图书馆没有这本书");
            $("#libinfo").append("</br><p>亲自去图书馆<a href="+"'"+indexurl+"'"+"target='_blank'>看看</a></p>");
       }
        else
       {
            $('#libinfo').append('很幸运，图书馆有这本书</br>');
            $('#libinfo').append('<table border="1px" cellspacing="0px" bordercolor="#006600" style="border-collapse:collapse" class="info"></table>');
            var td="";
            var num = 1;
            var total;
            $('.info').append('<tr><td>书号</td><td>序号</td><td>馆藏位置</td></tr>');
            $search_page.find("table tr td").each(function(){
                if($(this).attr("class") === "holdingslist" )
                {

                    if(num%4!=3)
                    {
                        td += '<td>'+$(this).text()+'</td>';
                        //alert($(this).text());
                    }
                    if(num%4===0)
                    {
                        total = '<tr>'+td+'</tr>';
                        $('.info').append(total);
                        td = "";
                    }
                    num = num + 1;
                }
            });
            $('#libinfo').append('是不是发现木有馆藏位置？因为图书馆系统更新，我无力从技术角度获取馆藏位置。。。如有需要，请点击以下链接手动查询 </br>');
            $('#libinfo').append('<a href="http://211.81.31.34/uhtbin/cgisirsi/x/0/0//57/49?user_id=LIBNORMAL&password=LIBNO#">点这里</a>');
        }
    }
})},500);
}

