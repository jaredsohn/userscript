// NO Google.com.hk
// Modified from NO Google.com.hk & google.cn By PSJay
// ==UserScript==
// @name        NO Google.com.hk
// @namespace   LongLiveKimJongIl
// @version     1.0.4
// @description	强制将Google从.com.hk和.cn域名重定向到.COM域名
//
// @include     http://www.google.com.hk/search?*
// @include     http://www.google.com.hk/
// @include     http://www.google.com.hk/webhp?*
// @include     http://www.google.cn/*
// @include     http://www.g.cn/*
// ==/UserScript==

// 如果需要指定搜索语言，请修改 defaultLanguage 变量。
// If you need to specify the language of Google Search, please modify the defaultLanguage variable.
// 示例 / Example :
// var defaultLanguage = 'zh-CN';

// Remodified by PSJay (http://psjay.in)
// 修正了google将cn页面设置为鼠标点击跳转后不自动重定向的问题
// 修正了默认语言不正确的问题

// Remodified by Bachue:
// 进一步修复了可能导致无限跳转的BUG。
// 修复了谷歌音乐被重定向的BUG。
// 不再将开头是www.google.cn的域名重定向，而是尽可能采取更聪明的办法。
// 修复了更多该被重定向而结果没有被重定向的BUG。

var defaultLanguage = 'zh-CN';

function selectNodes(query) {
	return document.evaluate (
		query,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
}

var locationProtocol = window.location.protocol;
if (locationProtocol == 'http:') 
{
	if(window.location.href == "http://www.google.com.hk/" || window.location.href == "http://www.google.cn/" || window.location.href.indexOf("http://www.google.cn/webhp")==0 || window.location.href == "http://www.g.cn/" || window.location.href.indexOf("http://www.google.com.hk/webhp")==0)
	{
		if(defaultLanguage.length>0)
		{
			var iframe = document.createElement('iframe');
			iframe.id = 'ncr';
			iframe.src = 'http://www.google.com/ncr';
			iframe.setAttribute('style', 'display: none');
			document.body.appendChild(iframe);
			iframe.addEventListener('load', 
			function()
			{
				window.location.href="http://www.google.com/webhp?hl=" + defaultLanguage;
			}, false);
		}
		else
		{
			window.location.href="http://www.google.com/ncr";
		}
	}
	else if(window.location.href.indexOf("http://www.google.com.hk/search")==0 || window.location.href.indexOf("http://www.google.cn/search")==0)
	{
		var iframe = document.createElement('iframe');
		iframe.id = 'ncr';
		iframe.src = 'http://www.google.com/ncr';
		iframe.setAttribute('style', 'display: none');
		document.body.appendChild(iframe);
		iframe.addEventListener('load', 
		function()
		{
			var searchHref = 'http://www.google.com/search' + window.location.search;
			if (defaultLanguage.length > 0)
				if (searchHref.indexOf('hl=') < 0)
					searchHref += '&hl=' + defaultLanguage;
			window.location.href = searchHref + '#sl';
		}, false);
	}
}
