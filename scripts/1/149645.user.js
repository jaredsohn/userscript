// ==UserScript==
// @name          t.cn Bypasser
// @namespace     weibo
// @description   Bypasses the t.cn shortner on weibo
// @include       http://weibo.com/*
// @include       http://e.weibo.com/*
// ==/UserScript==

void (function(){
	document.addEventListener("mousedown", tcnToLinkTitleURL, true);

	function tcnToLinkTitleURL(ev)
	{
		var target = ev.target;
//		if (/^http(?:s?):\/\/t.cn\//.test(target.href))
		if (/^http(?:s?):\/\/t.cn\//.test(target.href) && /^http(?:s?):\/\//.test(target.title))
			target.href=target.title;
	}
}());