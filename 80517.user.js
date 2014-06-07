// ==UserScript==
// @name			books_recommend_nju
// @namespace		books_recommend_nju
// @version			v0.25
// @include			http://www.douban.com/subject/*
// @include			http://www.douban.com/isbn/*
// @include			http://book.douban.com/subject/*
// @include			http://books.google.cn/*
// @include			http://www.amazon.cn/*
// @include			http://www.amazon.com/*
// @include			http://product.dangdang.com/product.aspx*
// @require http://lib.nju.edu.cn/web2/jquerymin.js
// @author			lab@lib.tsinghua.edu.cn
// @thankto			xmulib.org/HUST
// 2009-03-11	Add	link to	thu	innopac	to get book	info.
// 2009-04      update douban
// 2010-03-11   Greasmonkey update
// 2010-11-07   Add dangdang
// 2010-11-08   update Amazon
//
// ==/UserScript==

String.prototype.process = function(o) {
    return this.replace(/\$\{([^\}]+)\}/g, function(a, b) {
        return o[b];
    });
};
var isbn, title;
var _extLinkTpl = 'http://202.119.47.8:8080/opac/openlink.php?historyCount=1&strText=${isbn0}&doctype=ALL&strSearchType=isbn&match_flag=forward&displaypg=20&sort=CATA_DATE&orderby=desc&showmode=list&dept=ALL';
var url_by_title= 'http://202.119.47.8:8080/opac/search_adv_result.php?sType0=02&q0=${title0}';
var booklist = [];
var finallink;

var DOUBAN = 0, AMAZON = 1, AMAZON_CN = 2, GOOGLE_BOOK = 3,DANGDANG=4,ERR_SITE = 5;
var now_site = DOUBAN;

var not_found_msg = "未找到符合查询条件的馆藏";

isbn='';
title='';

$(document).ready(
function()
{ 
	var now_site_url = window.location.href;
	if (now_site_url.substr(0, 31) == "http://book.douban.com/subject/" || now_site_url.substr(0, 27) == "http://www.douban.com/isbn/") {
		now_site = DOUBAN; 
		//var jQuery = unsafeWindow.jQuery;
		//$ = jQuery;
		if ($('.top-nav-items	li.on').text().trim()	== '豆瓣读书') 
		{
			title =	$('h1').text();
			title = title.replace(/(\(|（).*(\)|）)/g, " ").split(":")[0];
			$("#info .obmo .pl").each(function(i)
			{
				if ($(this).text() == 'ISBN:')
				{
					isbn = $(this)[0].nextSibling.nodeValue;
					isbn = isbn.substr(1,13);
				}
			});
 		}
	} 
	else if (now_site_url.substr(0, 40) == "http://product.dangdang.com/product.aspx" ) {
		now_site = DANGDANG;
		var _extLinkTpl = 'http://202.119.47.8:8080/opac/openlink.php?historyCount=1&strText=${isbn0}&doctype=ALL&strSearchType=isbn&match_flag=forward&displaypg=20&sort=CATA_DATE&orderby=desc&showmode=list&dept=ALL';
var url_by_title= 'http://202.119.47.8:8080/opac/search_adv_result.php?sType0=02&q0=${title0}';
		title = $('h1').text();
		GM_log(title);
		title = title.replace(/(\(|（).*(\)|）)/g, " ").split(":")[0];
		var nList=document.getElementsByName('__Property_pub');
		nList=nList.item(0).childNodes;
		lis=nList.item(7).childNodes.item(5).childNodes.item(1).innerHTML;
		if (lis.substring(0, 8) == "I S B N：") {
			isbn = lis.substring(lis.length-13, lis.length);
			GM_log(isbn);
		}
		/* 
		 *Get the position of ISBN on DangDang	
		for(var i =0; i<nList.length;i++){
			GM_log('Name:'+i+':'+nList.item(i).nodeName);			
			GM_log('Type:'+nList.item(i).innerText);			
			if(nList.item(i).nodeName=='UL'){	
				nList=nList.item(i).childNodes;
				for(var j =0; j<nList.length;j++){
					GM_log('Name:'+j+':'+nList.item(j).nodeName);		
					if(nList.item(j).hasChildNodes()==true){
						var cList=nList.item(j).childNodes;
						if(cList.length>0){
							for(var k =0; k<cList.length;k++){
								GM_log('Name:'+k+':'+cList.item(k).nodeName);			
								GM_log('Text:'+cList.item(k).innerHTML);			
							}						
						}
					}					
				}
			}				
		}
		*/
	} 
	else if (now_site_url.substr(0, 22) == "http://www.amazon.com/") {
		now_site = AMAZON;
		var _extLinkTpl = 'http://202.119.47.8:8080/opac/openlink.php?historyCount=1&strText=${isbn0}&doctype=ALL&strSearchType=isbn&match_flag=forward&displaypg=20&sort=CATA_DATE&orderby=desc&showmode=list&dept=ALL';
var url_by_title= 'http://202.119.47.8:8080/opac/search_adv_result.php?sType0=02&q0=${title0}';
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
					);
				}
				);
			}
		}
		);
	} else if (now_site_url.substr(0, 21) == "http://www.amazon.cn/") {
		if ($('#navCatsubnav .navCat div a').text()	== '图书') 
		{
			now_site = AMAZON_CN;
			title = $('h1').text();
			title = title.replace(/(\(|（).*(\)|）)/g, " ").split(":")[0];			
			title = $.trim(title);
			//GM_log(title);
			$('.bucket .content ul li').each(function() {

				var strVal=$(this).text();
				if (strVal.substr(0, 4) == "ISBN") {
					//isbn = $(this)[0].nextSibling.nodeValue; 
					//isbn = isbn.split("/")[0];
					isbn =strVal.substr(6,strVal.length); 
					GM_log(isbn);					
				}
			});
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
	
	if ((now_site == DOUBAN && $('.top-nav-items	li.on').text().trim()	== '豆瓣读书') || now_site == AMAZON_CN  || now_site == AMAZON || now_site == DANGDANG || now_site == GOOGLE_BOOK) 
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
			});
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
});
						
    function myonload_isbn(res) 
    {
       // GM_log('ajax finished! status:'+ res.status+res.statusText);
        var char    =  res.responseText;
        if(char.indexOf(not_found_msg)==-1)
        {
          
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
        } else if (now_site == DANGDANG) {
        	//GM_log('DongDong Site!');
        	$(".dp_sidebar").prepend(InsertBookList());
        }else if (now_site == AMAZON) {
        	$("h2:first").before(InsertBookList());
        } else if (now_site == AMAZON_CN) {
        	GM_log(InsertBookList());
        	$('#AutoBuyXGetY').before(InsertBookList());
        } else if (now_site == GOOGLE_BOOK) {
        	var htmlStr = '<tr><td><a href="'+finallink+'" target="_blank">到南京大学图书馆看看？</a></td></tr>';
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
				s.push('<h2>Want To Borrow Books? Welcome To NanJing University Library! </h2>');
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
    	} 
    	else if (now_site == AMAZON_CN || now_site == DOUBAN ) {
            var _itemTpl = ['<li>',
                        '<span style="float:left">&nbsp;索 书 号 : ${index}</span>',
                        '<span style="float:right">${status}</span>',
                        '<br />',
                        '<span style="clear:both">馆藏地点: ${place}</span>',
                        '</li>'].join('');
    		var s = [];
    				s.push('<h2>想借书? 来南京大学大学图书馆吧·  ·  ·  ·  ·  · </h2>');
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
    	//Set information format fot booklist on dangdang site
    	else if (now_site == DANGDANG) {
            var _itemTpl = ['<li>',
                        '<span>索 书 号: ${index}</span>',
                        '<br />',
                        '<span>馆藏状态: ${status}</span>',
                        '<br />',
                        '<span>馆藏地点: ${place}</span>',
                        '</li>'].join('');
    		var s = [];
            s.push('<div class="dp_sidebar_content">');
            s.push('<div class="side_title">');    
			s.push('<h2><span>想借书?来南京大学大学图书馆吧!</span></h2>');
            s.push('</div>');
            
            var l = booklist.length;
            s.push('<div class="side_main" name="NJULib_BookList">');
           if (l > 0) 
            {
                s.push('<ul class="photo">');
                for (var i = 0; i < l; i++) {
                    s.push(_itemTpl.process(booklist[i]));
                }
                s.push('<li class="more none"><h4 style="margin-bottom: 0px;"><a href="'+ finallink+'" target="_blank">详细馆藏信息>></a></h4></li>');

                s.push('</ul>');
            }
           else{
        	   s.push('<div align="right"><h4 style="margin-bottom: 0px;"><a  href="'+ finallink+'" target="_blank">详细馆藏信息>></a></h4></div>');
           }
            s.push('</div></div></br>');
          }
            return s.join('');
    }
	
function _analyse_t(res) {
	if (res.responseText.indexOf(not_found_msg) == -1) {
		finallink = url_by_title.process({
			'title0' : title
		});

		if (now_site == DOUBAN) {
			var htmlStr = '<h2>想借书? 到南京大学大学图书馆看看!</h2>';
			htmlStr += '<div class="indent"><li><a href="' + finallink
					+ '" target="_blank">藏书情况</a></li>';
			$('.aside').prepend(htmlStr + '');
		} else if (now_site == AMAZON) {
			var htmlStr = '<h2>Want To Borrow Books? Welcome To NanJing University Library!</h2>';
			htmlStr += '<div class="indent"><li><a href="' + finallink
					+ '" target="_blank">More Details</a></li><hr>';
			$("h2:first").before(htmlStr);
		} else if (now_site == AMAZON_CN) {
			var htmlStr = '<h2>想借书? 到南京大学大学图书馆看看!</h2>';
			htmlStr += '<div class="indent"><li><a href="' + finallink
					+ '" target="_blank">藏书情况</a></li><hr>';
			$("h2:first").before(htmlStr);
		} else if (now_site == DANGDANG) {
			title1=encodeURIComponent(title);
			var htmlStr = '<div class="dp_sidebar_content"><div class="side_title"><h2><span>到南京大学大学图书馆看看</h2></span></h2></div>';
			htmlStr += '<div class="side_main" name="NanJing_BookList"><div><ul class="photo"><li class="more none"><h4 style="margin-bottom: 0px;">';
			htmlStr += '<div align="right"><a href="http://202.119.47.8:8080/opac/search_adv_result.php?sType0=02&q0=' + title1;
			htmlStr += '" target="_blank">藏书情况>></a><div></h4></li></ul></div></div></div>';
			$(".dp_sidebar").prepend(htmlStr);			
		} else if (now_site == GOOGLE_BOOK) {
			var htmlStr = '<tr><td><a href="' + finallink
					+ '" target="_blank">到南京大学图书馆看看？</a></td></tr>';
			$(".showall:first").append(htmlStr);
		}
	}

	return;
}

function proc_t() {
	title = title.replace(/\+/g, "%2B");

	title = title.replace(/\//g, "%2F"); //change the '/' into %2F
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
			method : 'GET',
			url : url_by_title.process({
				'title0' : title
			}),
			headers : {
				'User-agent' : 'Mozilla/4.0 (compatible) Greasemonkey'
			},
			overrideMimeType : "text/html, charset=GBK",
			onload : _analyse_t
		});
	}, 500);
}

