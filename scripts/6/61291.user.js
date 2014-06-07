// ==UserScript==
// @name			books_recommend_THU
// @namespace		books_recommend_THU
// @version			v0.25
// @include			http://www.douban.com/subject/*
// @include			http://www.douban.com/isbn/*
// @include			http://books.google.cn/*
// @include			http://www.amazon.cn/*
// @include			http://www.amazon.com/*
// @require http://166.111.120.36:88/xport/jquerymin.js
// @require http://userscript-updater-generator.appspot.com/?id=61291
// @title THU LIB COOKIES
// @version 1.1.0
/* @reason
	再一次简单的测试：简单的将更新的功能使能进行测试
@end */
// @author			jiaobaoxing@126.com
// @director        Tsinghua  University  Library /System Development Team
// @thankto			xmulib.org/HUST/yaofei@lib.tsinghua.edu.cn
// 2009-03-11	Add	link to	thu	innopac	to get book	info.
//
// ==/UserScript==

String.prototype.process = function(o) {
    return this.replace(/\$\{([^\}]+)\}/g, function(a, b) {
        return o[b];
    });
};

var isbn, title;
var _extLinkTpl = 'http://innopac.lib.tsinghua.edu.cn/search*chx/i?SEARCH=${isbn0}';
var url_by_title= 'http://innopac.lib.tsinghua.edu.cn/search*chx/t?SEARCH=${title0}';
var booklist = [];
var finallink;

var DOUBAN = 0, AMAZON = 1, AMAZON_CN = 2, GOOGLE_BOOK = 3, ERR_SITE = 4;
var now_site = DOUBAN;

var not_found_msg = "未找到符合查询条件的馆藏";

isbn='';
title='';

$(document).ready(
function()
{ 
	var now_site_url = window.location.href;
	if (now_site_url.substr(0, 30) == "http://www.douban.com/subject/" || now_site_url.substr(0, 27) == "http://www.douban.com/isbn/") {
		now_site = DOUBAN; 
		var jQuery = unsafeWindow.jQuery;
		$ = jQuery;
		if ($('#nav	a.now span').text()	== '读书') 
		{
			title =	$('h1').text();
			$("#info .obmo .pl").each(function(i)
			{
				if ($(this).text() == 'ISBN:')
				{
					isbn = $(this)[0].nextSibling.nodeValue;
					isbn = isbn.substr(1,13);
				}
			})
 		}
	} else if (now_site_url.substr(0, 22) == "http://www.amazon.com/") {
		now_site = AMAZON;
		_extLinkTpl = 'http://innopac.lib.tsinghua.edu.cn/search*eng/i?SEARCH=${isbn0}';
		url_by_title= 'http://innopac.lib.tsinghua.edu.cn/search*eng/t?SEARCH=${title0}';
		title = $('h1').text();
		title = title.replace(/(\(|（).*(\)|）)/g, " ").split(":")[0];
		$('h2').each(function() {
			if ($(this).text() == "Product Details") {
				$(this).siblings(".content").children().each(function() {
					$(this).children().each(function() {
						var lis = $(this).text();
						//alert(lis.substr(0, 7));
						if (lis.substring(0, 8) == "ISBN-13:") {
							isbn = lis.substring(9, 12) + lis.substring(13, lis.length);
							//alert(isbn);
						}
					}
					)
				}
				)
			}
		}
		)
	} else if (now_site_url.substr(0, 21) == "http://www.amazon.cn/") {
		now_site = AMAZON_CN;
		if ($('#twotabtop .middleon div a').text()	== '图书') 
		{
			title = $('h1').text();
			title = title.replace(/(\(|（).*(\)|）)/g, " ").split(":")[0];
			$('#Preferences .Left .dark').each(function() {
				if ($(this).text().substr(0, 4) == "ISBN") {
					isbn = $(this)[0].nextSibling.nodeValue; 
					isbn = isbn.split("/")[0];
				}
			})
		}
	} else if (now_site_url.substr(0, 23) == "http://books.google.cn/") {
		now_site = GOOGLE_BOOK;
		title = $('h1').text();
		title = title.split("/")[0];
		title = $.trim(title);
		$('.metadata_label').each(function() {
			var temp = $(this).text();
			if (temp.substr(0, 4) == "ISBN") {
				isbn = $(this).next().text();
				isbn = isbn.split(",")[0];
			}
		});
	} else {
		now_site = ERR_SITE;
	}
	
	if (now_site == AMAZON){
		not_found_msg = "No matches found";
	}
	
	if ((now_site == DOUBAN && $('#nav	a.now span').text()	== '读书') || (now_site == AMAZON_CN && $('#twotabtop .middleon div a').text()	== '图书') || now_site == AMAZON || now_site == GOOGLE_BOOK) 
	{	
		if(isbn!='')
		{
		setTimeout(function()
		{
			GM_xmlhttpRequest
			({
				method:	'GET',
				url: _extLinkTpl.process({ 'isbn0': isbn }),
				headers: 
				{
					'User-agent': 'Mozilla/4.0 (compatible)	Greasemonkey'
				},
				onload:	myonload_isbn
			})
		}, 500);
	}
	else
		{
			if(title!='')
			{
				proc_t();
			}
			else
				{
					return;
				}
		}
	}
})
						
    function myonload_isbn(res) 
    {
       // GM_log('ajax finished! status:'+ res.status+res.statusText); ???
        var char    =  res.responseText
        if(char.indexOf(not_found_msg)==-1)
        {
						//GM_log('ISBN???');
            
            myextract(res);
     
        }
        else
        {
          //  GM_log('no such book by isbn');

						if(title!='')
						{
							proc_t();
						}
						return;
        }

    }
	
	function myextract(res)
	{
        var regular_formular = /<span\s+id=["']?copySection["']?.*?>[^$]*?<\/table>[\r\n]*/igm;
        var rst = res.responseText.match(regular_formular);
		//GM_log('match result='+rst);
        if (rst) 
        {
            finallink = _extLinkTpl.process({ 'isbn0': isbn });
			//GM_log('finallink='+finallink);
	            
            var s = rst[0].replace(/(<.*?>)|(&nbsp;)|([ \t])/ig, '').replace(/(^\s+)|(\s+$)/ig, '').replace(/[\r\n]{2,}/ig, '\n').split('\n');
            var l = s.length;
            for (var i = 3; i < l; i++) {
                booklist.push({ 'place': s[i], 'index': s[++i], 'status': s[++i] });
            }
        }
        else 
        {
            finallink = _extLinkTpl.process({ 'isbn0': isbn });
			
        }
        
        if (now_site == DOUBAN) {
        	$('.aside').prepend(InsertBookList());
        } else if (now_site == AMAZON) {
        	$("h2:first").before(InsertBookList());
        } else if (now_site == AMAZON_CN) {
        	$("h2:first").before(InsertBookList());
        } else if (now_site == GOOGLE_BOOK) {
        	var htmlStr = '<tr><td><a href="'+finallink+'" target="_blank">到清华图书馆看看？</a></td></tr>';
          $(".showall:first").append(htmlStr);
        }
	
	}

    function InsertBookList() 
    {
    	if (now_site == AMAZON) {
    		var _itemTpl = ['<li>',
                    '<span style="float:left">Call Number: ${index}</span>',
                    '<span style="float:right">${status}</span>',
                    '<br />',
                    '<span style="clear:both">&nbsp;&nbsp;&nbsp;Location &nbsp;&nbsp;: ${place}</span>',
                    '</li>'].join('');
				var s = [];
				s.push('<h2>Want To Borrow Books? Welcome To Tsinghua University Library! </h2>');
        s.push('<div class="indent">');
        s.push('<h4 style="margin-bottom: 0px;"><a href="'+ finallink+'" target="_blank">Detail Information</a></h4>');
        var l = booklist.length;
        if (l > 0) 
        {
            s.push('<ul class="bs">');
            for (var i = 0; i < l; i++) {
                s.push(_itemTpl.process(booklist[i]));
            }
            s.push('</ul>');
        }
        s.push('</div></br>');
        s.push('<hr>');
    	} else if (now_site == AMAZON_CN || now_site == DOUBAN) {
        var _itemTpl = ['<li>',
                    '<span style="float:left">&nbsp;索 书 号 : ${index}</span>',
                    '<span style="float:right">${status}</span>',
                    '<br />',
                    '<span style="clear:both">馆藏地点: ${place}</span>',
                    '</li>'].join('');
		var s = [];
				s.push('<h2>想借书? 来清华大学图书馆吧·  ·  ·  ·  ·  · </h2>');
        s.push('<div class="indent">');
        s.push('<h4 style="margin-bottom: 0px;"><a href="'+ finallink+'" target="_blank">详细馆藏信息</a></h4>');
        var l = booklist.length;
        if (l > 0) 
        {
            s.push('<ul class="bs">');
            for (var i = 0; i < l; i++) {
                s.push(_itemTpl.process(booklist[i]));
            }
            s.push('</ul>');
        }
        s.push('</div></br>');
        if (now_site == AMAZON_CN) {
        	s.push('<hr>');
        }
      }
        return s.join('');
    }
	
	    function _analyse_t(res) 
    {
        if(res.responseText.indexOf(not_found_msg)==-1)
        {
            finallink = url_by_title.process({ 'title0': title });
            
            if (now_site == DOUBAN) {
							var htmlStr = '<h2>想借书? 到清华大学图书馆看看!</h2>';
						htmlStr += '<div class="indent"><li><a href="'+finallink+'" target="_blank">藏书情况</a></li>';
							$('.aside').prepend(htmlStr + '');
						} else if (now_site == AMAZON) {
							var htmlStr = '<h2>Want To Borrow Books? Welcome To Tsinghua University Library!</h2>';
							htmlStr += '<div class="indent"><li><a href="'+finallink+'" target="_blank">More Details</a></li><hr>';
							$("h2:first").before(htmlStr);
						} else if (now_site == AMAZON_CN) {
							var htmlStr = '<h2>想借书? 到清华大学图书馆看看!</h2>';
						htmlStr += '<div class="indent"><li><a href="'+finallink+'" target="_blank">藏书情况</a></li><hr>';
 							$("h2:first").before(htmlStr);
						} else if (now_site == GOOGLE_BOOK) {
							var htmlStr = '<tr><td><a href="'+finallink+'" target="_blank">到清华图书馆看看？</a></td></tr>';
 							$(".showall:first").append(htmlStr);
						}
        }

				return;
    }
    
		function proc_t()
		{
				title =  title.replace(/\+/g,"%2B"); 

				title = title.replace(/\//g,"%2F"); //change the '/' into %2F
				title = title.replace(/\:/g, "%3A"); //change the ':' into %3A
				title = title.replace(/,/g, "%2C"); //change the ',' into %2C
				title = title.replace(/\=/g, "%3D"); //change the '=' into %3D
				title = title.replace(/\%/g, "%25"); //change the '%' into %25
				title = title.replace(/&/g, "%26"); //change the '&' into %26
				title = title.replace(/@/g, "%40"); //change the '@' into %40

 				//title = encodeURI(title);
				//alert(encodeURI(url_by_title.process({ 'title0': title })));
        setTimeout(function() {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url_by_title.process({ 'title0': title }),
                headers: {
                    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                 }, 
                overrideMimeType: "text/html, charset=GBK",
                onload: _analyse_t
            })
        }, 500);
		}
