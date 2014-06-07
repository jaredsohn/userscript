// ==UserScript==
// @name           tieba_real_link
// @description    贴吧的链接不跳转
// @include        http://tieba.baidu.com/p/*
// @icon           http://tb.himg.baidu.com/sys/portraitn/item/4e2ed7f8bbb3d4f2c2d2bb21
// @author         congxz6688
// @version        2013.9.20.1
// ==/UserScript==

var $ = unsafeWindow.$;
$("a").each(function () {
	if (this.href.indexOf("http://jump.bdimg.com") != -1) {
		this.href = (this.innerHTML.indexOf("http")!=-1 ? "" : "http://") + this.innerHTML.replace(/&amp;/g, "&");
	}
});
