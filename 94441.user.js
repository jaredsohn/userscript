// ==UserScript==
// @name          起点小说阅读器 qidian(cmfu) book reader 简化改进版末页修复
// @namespace     q3boy
// @include       http://www.qidian.com/BookReader/*,*.aspx*
// @exclude       http://www.qidian.com/BookReader/vip,*,*.aspx*
// @exclude       http://www.qidian.com/BookReader/vol,*,*.aspx
// ==/UserScript==

GM_addStyle(".q3_book_content {padding:0px;margin:0 100px;}");
GM_addStyle(".q3_book_content p {text-indent:2em; color:#000000 ; font-size:22px; letter-spacing:1px; line-height:160% !important; font-family:'华文中宋', '宋体', Arial;}");
GM_addStyle(".q3_book_title {text-align:center; color:#990000; font-family:'微软雅黑', '宋体', Arial; font-size:30px; margin:10px; }");
GM_addStyle(".q3_book_nav {text-align:center; font-size:13px; margin:10px;}");
GM_addStyle("a {color: #376F9A ;}a:visited {color: #781C45 ;}a:active {color: #6799C4 ;}");

document.body.style.backgroundColor='rgb(233, 250, 255)';
document.body.innerHTML = '';

unsafeWindow.document.onmouseup=function(){};
unsafeWindow.document.onmousemove=function(){};
unsafeWindow.document.onmousedown=function(){};
unsafeWindow.document.onclick=function(){};
unsafeWindow.document.body.onclick=function(){};
unsafeWindow.document.oncontextmenu=function(){};

var nexturl = '';
var loadcomplete = false;
var nexturlend = '';

function loadFromUrl(url)
{
	GM_xmlhttpRequest({
		url: url,
		method: 'GET',
		overrideMimeType: 'text/plain;charset=gb2312',
		onload: function(res)
		{
			reg = url.match(/^.+BookReader\/(\d+),(\d+)\..*$/im);//匹配   /BookReader/数字,数字   形式 \d 数字
			//执行对大小写不敏感的匹配。 i
			//执行多行匹配。m
			bookid = parseInt(reg[1]);
			chapid = parseInt(reg[2]);
			
			reg = res.responseText.match(/<span\s+.*?id="lbChapterName"\s*.*?>(.+?)<\/span>/im);
			title = reg[1];
			
			reg = res.responseText.match(/<script.*?>\s*prevpage='(.+?)'.*\s*nextpage='(.+?)'.*\s*bookpage='(.+?)'.*\s*<\/script>/im);
			urldir = url.replace(/[^\/]+?$/ig, '');
			prevurl = urldir + reg[1];
			nexturl = reg[2];
			reg = nexturl.match(/\w+/im);
			//nexturlend = reg[1];
			if (reg == 'BookReader')
			{
				nexturl = 'http://www.qidian.com' + nexturl;
			}
			else
				{
					nexturl = urldir + nexturl;
				}
			listurl = 'http://www.qidian.com/Bookreader/' + bookid + ".aspx";
			bookurl = 'http://www.qidian.com/Book/' + bookid + ".aspx";
			
			reg = res.responseText.match(/<div\s+.*?id="content"\s*.*?>[.\s]*<script\s+.*?src='(.+?)'/im);
			scripturl = reg[1];
			GM_xmlhttpRequest({
				url: scripturl,
				method: 'GET',
				overrideMimeType: 'text/plain;charset=gb2312',
				onload: function(res)
				{
					substance = res.responseText.replace(/^.+?\('/im, '');
					substance = substance.replace(/'\).*?$/im, '');
					substance = substance.replace(/<(div|span|script).*?>.*?<\/\s*(div|span|script)>/ig, '');	
					substance = substance.replace(/^(?:[\s　]+)?(.*?)(?:[\s　]+)?$/ig, '$1');
					substance = substance.replace(/<\/?\s*a.*?>/ig, '');
					substance = substance.replace(/<\/?\s*clk.*?>/ig, '');
					substance = substance.replace(/<\/?\s*nobr.*?>/ig, '');
					substance = substance.replace(/<p>(\s|(&nbsp;)|　)*/ig, '<p>');
					substance = substance.replace(/(&amp;#8226;)|(&amp;:#8226:)|(&amp;#8226；)/ig, '·');
					substance = substance.replace('起点中文网 www\.qidian\.com 欢迎广大书友光临阅读，最新、最快、最火的连载作品尽在起点原创！', '');
					substance = substance.replace('起点中文网www\.qidian\.com欢迎广大书友光临阅读，最新、最快、最火的连载作品尽在起点原创！', '');
					substance = substance.replace('起点中文网 www\.cmfu\.com 欢迎广大书友光临阅读，最新、最快、最火的连载作品尽在起点原创！','');
					
					if (substance.substr(0, 3) != '<p>'){
						substance = '<p>' + substance;
					}
					
					div = document.createElement('div');
					str = '<div class="q3_book_title">' + title + '</div>';
					str += '<div class="q3_book_nav"><a href="' + prevurl+ '"><<上一页</a> | <a href="' + listurl+ '">目录</a> | <a href="' + bookurl+ '">书页</a> | <a href="javascript:加入书架书签" onclick="javascript:MyAjax.AddBookMark(\'' + bookid + '\',\'' + chapid + '\',null)">书签</a> | <a href="javascript:投推荐票" onclick="javascript:MyAjax.RecomBook(\'' + bookid + '\', null)">投票</a> | <a href="' + nexturl+ '">下一页>></a></div>';
					str += '<div class="q3_book_content">' + substance + '</div>';
					str += '<div class="q3_book_nav"><a href="' + prevurl+ '"><<上一页</a> | <a href="' + listurl+ '">目录</a> | <a href="' + bookurl+ '">书页</a> | <a href="javascript:加入书架书签" onclick="javascript:MyAjax.AddBookMark(\'' + bookid + '\',\'' + chapid + '\',null)">书签</a> | <a href="javascript:投推荐票" onclick="javascript:MyAjax.RecomBook(\'' + bookid + '\', null)">投票</a> | <a href="' + nexturl+ '">下一页>></a></div>';
					str += '<hr />';
					div.innerHTML = str;
					document.body.appendChild(div);
					unsafeWindow.prevpage = prevurl;
					unsafeWindow.nextpage = nexturl;
					unsafeWindow.bookpage = listurl;
					
					loadcomplete = true;
				}
			});
		}
	});
}

function loadnext()
{
	if (loadcomplete)
	{
		var sc = document.documentElement.scrollTop;
		var wh = window.innerHeight ? window.innerHeight : document.body.clientHeight;
		var total = (document.body.scrollHeight - wh);
		var remain = total - sc;
		if(remain < 1200)
		{
			loadcomplete = false;
			loadFromUrl(nexturl);
		}
	}
}

loadFromUrl(location.href.toString());
window.setInterval(loadnext, 300);