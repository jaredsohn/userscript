// NO Google.com.hk & google.cn
// Modified from NO Google.com.hk By bachue 
// ==UserScript==
// @name        NO Google.com.hk & google.cn
// @namespace   LongLiveKimJongIl
// @version     1.1.2
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

// Remodified by PSJay (http://www.psjay.com)
// 修正了google将cn页面设置为鼠标点击跳转后不自动重定向的问题
// 修正了默认语言不正确的问题
// 1.1修正了谷歌音乐跳转的bug
// 1.1.1修正了谷歌购物搜索跳转的bug
// 1.1.2修正了一个无限跳转的bug

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
	var redirectTimes = 0;
	if(window.location.href == ("http://www.google.com.hk/") || (window.location.href.indexOf("http://www.google.cn/") == 0 && window.location.href.indexOf("/","http://www.google.cn/".length) == -1) && window.location.href.indexOf("http://www.google.cn/pr") == -1 || window.location.href.indexOf("http://www.g.cn/")==0 || window.location.href.indexOf("http://www.google.com.hk/webhp?")==0)
	{
		window.location.href="http://www.google.com/webhp?hl=" + defaultLanguage;
		redirectTimes++;
		if (redirectTimes > 1) {
			window.location.href="http://www.google.com/ncr"
			window.location.href="http://www.google.com/webhp?hl=" + defaultLanguage;
			redirectTimes = 0;
		}
	}
	else if(window.location.host == 'www.google.com.hk')
	{
		var iframe = document.createElement('iframe');
		iframe.id = 'ncr';
		iframe.src = 'http://www.google.com/webhp?hl=' + defaultLanguage;
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