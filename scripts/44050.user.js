// ==UserScript==
// @name			douban_THU
// @namespace		douban_THU
// @version			v0.25
// @include			http://www.douban.com/subject/*
// @include			http://www.douban.com/isbn/*
// @author			ddoutf@gmail.com
// @thankto			xmulib.org/HUST
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

if(typeof unsafeWindow.jQuery !== "undefined") 
{
  var jQuery = unsafeWindow.jQuery;
  var $	= jQuery; 
}

isbn='';
title='';

$(document).ready(
function()
{
	if ($('#nav	a.now span').text()	== '读书') 
	{
		// get book	title
		title =	$('h1').text();
		//title	= encodeURI(title);
		// get book	isbn
		$("#info .obmo .pl").each(function(i)
		{
			if ($(this).text() == 'ISBN:')
			{
				isbn = $(this)[0].nextSibling.nodeValue;
				isbn = isbn.substr(1,13);
			}
		})
		
		GM_log('Title='+title);
		GM_log('ISBN='+isbn);
		
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
        GM_log('ajax finished! status:'+ res.status+res.statusText);
        var char    =  res.responseText
        if(char.indexOf("未找到符合查询条件的馆藏")==-1)
        {
						GM_log('ISBN找到了');
            
            myextract(res);
     
        }
        else
        {
            GM_log('no such book by isbn');

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
		GM_log('match result='+rst);
        if (rst) 
        {
            finallink = _extLinkTpl.process({ '_isbn': isbn });
			GM_log('finallink='+finallink);
	            
            var s = rst[0].replace(/(<.*?>)|(&nbsp;)|([ \t])/ig, '').replace(/(^\s+)|(\s+$)/ig, '').replace(/[\r\n]{2,}/ig, '\n').split('\n');
            var l = s.length;
            for (var i = 3; i < l; i++) {
                booklist.push({ 'place': s[i], 'index': s[++i], 'status': s[++i] });
            }
        }
        else 
        {
            finallink = _extLinkTpl.process({ '_isbn': isbn });
        }

        $('#tablerm').prepend(InsertBookList());
	
	}

    function InsertBookList() 
    {
        var _itemTpl = ['<li>',
                    '<span style="float:left">&nbsp;索 书 号 : ${index}</span>',
                    '<span style="float:right">${status}</span>',
                    '<br />',
                    '<span style="clear:both">馆藏地点: ${place}</span>',
                    '</li>'].join('');
		var s = [];
				s.push('<h2>想借书? 来清华大学图书馆吧·  ·  ·  ·  ·  · </h2>');
        s.push('<div class="indent">');
        s.push('<h4 style="margin-bottom: 0px;"><a href="' + finallink + '" target="_blank">详细馆藏信息</a></h4>');
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
        return s.join('');
    }
	
	    function _analyse_t(res) 
    {
        if(res.responseText.indexOf("未找到符合查询条件的馆藏")==-1)
        {
            finallink = url_by_title.process({ 'title0': title });
            
						var htmlStr = '<h2>想借书? 到清华大学图书馆看看·  ·  ·  ·  ·  · </h2>';
						htmlStr += '<div class="indent"><li><a href="'+finallink+'" target="_blank">藏书情况</a></li>';
						$("#tablerm div:eq(0)").after(htmlStr);
        }

				return;
    }
    
		function proc_t()
		{
				GM_log('Enter proc_t');
        setTimeout(function() {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url_by_title.process({ 'title0': title }),
                headers: {
                    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'
                },
                onload: _analyse_t
            })
        }, 500);
		}
