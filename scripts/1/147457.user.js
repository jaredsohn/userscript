// ==UserScript==
// @name           AMO Firefox redirect to zh-CN
// @version        1.0
// @author         wuji2004
// @include        https://addons.mozilla.org/*/firefox/*
// ==/UserScript==

		
    if (window.location.href.indexOf("zh-CN") == -1)
		{
		   location.href = location.href.replace(/.org\/(.*)\/firefox\//, ".org/zh-CN/firefox/");
		
		}