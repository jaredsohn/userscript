// ==UserScript==
// @name        ZOL_PCPOP_PCONLINE
// @namespace   ZPP
// @description 自动跳转到全部页面显示
// @include     http://*.zol.com.cn/*/*.html
// @include     http://www.pcpop.com/doc/*
// @include     http://*.pconline.com.cn/*
// @grant none
// @version     1.1
// ==/UserScript==

var patt = new RegExp(/(\d+)(\.s?html?)/i);
var lt = window.location.href;
var pt = new RegExp(/(全文浏览|在本页浏览全文|本页阅读全文)/i);
if (patt.test(lt))
{
	var ellength = document.links.length;
	for (i=0; i<ellength; i++)
	{
		if (pt.test(document.links[i].innerHTML))
		{
			window.location.assign(document.links[i].href);
			break;
		}
	}
}
