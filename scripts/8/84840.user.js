// ==UserScript==
// @name			douban_SHLIB
// @namespace		douban_SHLIB
// @require			http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @version			v5
/* @reason
	适应新版豆瓣页面
@end*/
// @include			http://book.douban.com/subject/*
// @include			http://book.douban.com/isbn/*
// @include			http://book.douban.com/cart
// @include			http://book.douban.com/people/*/wish*
// @author			newchar@gmail.com
// @thankto			zhx@xmulib.org,freefcw@gmail.com
// 2009-01-04 Adds Ajax to get book info.
//
// ==/UserScript==

if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery; 
}

var thisScript = {
name: "douban_SHLIB", //脚本名称，请自行修改
id: "", //脚本在userscripts.org的id，请自行修改
version:"5" // 当前脚本版本号，请自行修改
}
var updater = new Updater(thisScript); // 用thisScript对象创建一个更新器对象
updater.check(24); //检查是否有更新

/*
	插入到图书馆也没查找链接
	因为部分图书没有ISBN
	将可能有重复使用的部分抽离出来
*/
function insertfind(title)
{
	var openLink = "http://ipac.library.sh.cn/ipac20/ipac.jsp?index=.TW&term="+title;
	var htmlStr = "<h2>上海图书馆ISBN查询失败  ·  ·  ·  ·  ·  · </h2>";
	htmlStr += '<div class="indent"><a href='+openLink+' target="_blank" title="点击前往上海图书馆搜索">到上海图书馆网站搜索《'+ title +'》</a></div>';
	$("#libinfo").html(htmlStr);
}


function insertloading(){
    var htmlstr = '<div id="libinfo" class="gray_ad"><h2>正在查询上图馆藏情况<img src="http://dailytuan.com/shlib/ajax-loader.gif">&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;· </h2></div>';
    $('.aside').prepend(htmlstr);
}
	

function page_subject(){
    //insert load img
    insertloading();


	// get book title
	var title = $('h1>span').text();
	//提前是为了防止出现没有isbn的书
	var isbn = null;
	//title = encodeURI(title);
	// get book isbn
	$('span.pl').each(function(i){
		if ($(this).text() == 'ISBN:'){
			isbn = $(this)[0].nextSibling.nodeValue;
			isbn = isbn.substr(1,13);

			setTimeout(function(){GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://dailytuan.com/shlib/shlib.php?isbn='+isbn,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				},
				onload: function(res) {
					//GM_log( 'http://210.42.106.193/getbook.php?isbn='+isbn + ' status:'+ res.status);
					var json = eval('('+res.responseText+')');

					if (json.ok > 0 ){			
						var openLink = 'http://ipac.library.sh.cn/ipac20/ipac.jsp?index=ISBN&term='+isbn;
						var htmlStr = '<div id="libinfo" class="gray_ad"><h2><a href="'+openLink+'" target="_blank" title="点击前往图书馆网页查看信息">前往上海图书馆</a></h2>';

						htmlStr += '<ul class="bs">';
						try
						{
							for (i=0;i<json.ok;i++)
							{
								htmlStr += '<li><span style="float:left">&nbsp;索 书 号 : '+json.data[i].i+'</span><span style="float:right">'+json.data[i].s+'</span><br /><span style="clear:both">馆藏地点: '+json.data[i].place+"</span></li>";
							} 
						}
						catch (e)
						{
						}
						
						htmlStr += '</ul></div></br>';

						$("#libinfo").html(htmlStr);
					}
					else{
						//GM_log('no such book');
						insertfind(title);
					}
				}
			})},500);
		}
	});
	if(isbn == null) insertfind(title);


}

function start_cart_search(){
    alert("start");
}

function page_cart(){
    var cssObj = {
        'background' : 'none repeat scroll 0 0 #94C886',
        'border' : '0 none',
        'border-radius' : '3px 3px 3px 3px',
        'color' : '#FFFFFF',
        'cursor' : 'pointer',
        'padding' : '5px 0',
        'width' : '100px',
    }
    $(".l2").first().append('<p id="lib_btn" class="l2">启动上图查询</p>');
    $("#lib_btn").css(cssObj);
    $("#lib_btn").click(start_cart_search);

}

function search_by_url(url){
}


function start_wish_search(){
    var i=0;
    //hold position
    $('.state').each(function(i){
        $(this).before('<div id="lib_'+i+'" class="state opt-r" >&nbsp;&nbsp;&nbsp;<img src="http://dailytuan.com/shlib/ajax-loader.gif">&nbsp;·&nbsp;·&nbsp;·</div>');
        i++;
    });

    var j=0;
    $('.title>a').each(function(j){
        var pagelink = $(this).attr('href');
        GM_log("each:"+j);
        setTimeout(function(){ GM_xmlhttpRequest({
            method : 'GET',
            url : 'http://dailytuan.com/shlib/shlib.php?url='+pagelink,
            onload : function(ret){
                GM_log("xhr:"+j);
                switch (ret.responseText){
                    case "0": $('#lib_'+j).html('<div id="lib_'+i+'" class="state opt-r" >&nbsp;&nbsp;&nbsp;<img src="http://dailytuan.com/shlib/no.gif"></div>');break;
                    case "1": $('#lib_'+j).html('<div id="lib_'+i+'" class="state opt-r" >&nbsp;&nbsp;&nbsp;<img src="http://dailytuan.com/shlib/yes.gif"></div>');break;
                    default : $('#lib_'+j).html("TAT");break;
                }
                j++;
            }
        })}, 500);
    });

}


function page_wish(){
    $('div.sort').first().before('<div class="sort"><a id="lib_btn" class="lnk-sharing lnk-douban-sharing">启动上图查询</a><span class="gray-dot">·</span></div>');
    $("#lib_btn").click(start_wish_search);
}


$(document).ready(function(){
    if (document.URL.indexOf("subject") > 0) page_subject();
    if (document.URL.indexOf("cart") > 0) page_cart();
    if (document.URL.indexOf("wish") > 0) page_wish();

});
