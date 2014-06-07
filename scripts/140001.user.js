// ==UserScript==
// @name        cb-clear
// @namespace   cb-clear
// @include     http://cnbeta.com/articles/*
// @include     http://www.cnbeta.com/articles/*
// @version     1
// ==/UserScript==
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
function GM_wait()
{
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();


// *** put your code inside letsJQuery: ***
function letsJQuery()
{
    $(document).ready(function () {
        $("[href=/topics/487.htm]").parents(".newslist").fadeOut();//去除某类新闻
	/**说明：要修改屏蔽新闻的类别，请先可耻地点一下该类新闻的logo，记录下它的topic序号
	再在此修改。如要增加，请先将上一行代码复制，并修改topics序号。附带列表:小米：487；水果：9；百度：261；360：300；瑞星：174
	**/
    });
	if(document.getElementById("good")){
		$("#good").fadeOut();//新闻右侧评论清除，不清除首页“优秀评论”
	}
}

