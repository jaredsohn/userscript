// ==UserScript==
//
// @name          byr_douban 
// @description    Search books which you see in douban on BUPT's Library   
// @namespace      http://bbs.byr.cn/
// @author         joest(chaojiong.zheng@gmail.com)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @version        1.1
// @include        http://book.douban.com/subject/*
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
//
//
// ==/UserScript==


var searchurl='http://211.68.68.197/opac_two/search2/searchout.jsp';
var isbn=null;


function insertloading(){
    var htmlstr = '<div id="libinfo" class="gray_ad"><h2>北京邮电大学图书馆信息查询</h2></div>';
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
            getBookInfo();
		}
	});
}

function getBookInfo(){
   setTimeout(function(){GM_xmlhttpRequest({
    method: 'POST',
    url: searchurl,
    data: 'search_no_type=Y&snumber_type=Y&suchen_type=5&suchen_word='+isbn+'&suchen_match=qx&recordtype=all&library_id=all&show_type=wenzi&B1=%C8%B7%B6%A8',
    overrideMimeType:'text/html;charset=utf-8',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    onload: function(responseDetails) {
        var responses=responseDetails.responseText;
        var $search_page = $(responses);
        var strHtml=null;
        if(responses.indexOf("d_sorryNoSearch.gif") != -1)
        {
            strHtml = "图书馆没有这本书</br>";
        }
        else
        {
            strHtml = "图书馆有这本书</br>";
            strHtml += '<table border="1px" cellspacing="0px" bordercolor="#006600" style="border-collapse:collapse" class="info">';
            var $search_table = $search_page.find("#searchout_tuwen");
            var $tds = $search_table.find(".td_color_1").find("td");
            var remains = $tds.eq(7).html();
            var last = remains.lastIndexOf(';');
            var booklink = 'http://211.68.68.197/opac_two/search2/'+$tds.eq(1).find('a').attr('href');
            strHtml += '<tr><td>索书号</td><td>直达链接</td><td>剩余</td></tr>'
            strHtml += '<tr><td>'+$tds.eq(6).text()+'</td><td><a href='+ booklink + '>go</a></td><td>'+ remains[last-6] + '</td></tr>'; 
            strHtml +='</table>';
        }
        appendInfo(strHtml);
        }
})},500);
}

function appendInfo(value){
    $("#libinfo").append(value);
}

$(document).ready(function(){
    page_subject();
});
