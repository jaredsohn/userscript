// ==UserScript==
// @author      Crend King
// @version     1.2
// @name        Solidot no threshold
// @namespace   http://kerenjin.com
// @description 此脚本将 solidot.org 评论的显示阀值固定为自定义值（默认为 0）。
// @include     http://*.solidot.org/*
// @include     https://*.solidot.org/*
// @run-at      document-start
// @homepage    https://userscripts.org/scripts/show/172836
// @downloadURL https://userscripts.org/scripts/source/172836.user.js
// @updateURL   https://userscripts.org/scripts/source/172836.meta.js
// ==/UserScript==

/*

版本历史

1.2, 2013/10/06
- 可自定义显示阈值。

1.1.1, 2013/09/15
- 增加对页面内超链接的支持。

1.1, 2013/09/07
- 修正从首页浏览时，后退失效的问题。

1.0, 2013/07/08:
- 初始版本，针对 RSS 使用者设计。

*/

///// preference section /////

var threshold = '0';


///// code section /////

var is_story_page = function (url)
{
	return url.hostname.contains('solidot.org') && url.pathname.startsWith('/story');
};

var is_threshold = function (url)
{
	return url.search.contains('threshold=');
};

var modify_threshold = function (url)
{
	if (is_story_page(url) && !is_threshold(url))
	{
		url.search = url.search + '&threshold=' + threshold;
	}
};

modify_threshold(window.location);

window.addEventListener('DOMContentLoaded', function (e) {
	var anchors = document.querySelectorAll('a[href]');
	for (var i = 0; i < anchors.length; ++i)
	{
		var anchor = anchors.item(i);
		modify_threshold(anchor);
	}
});